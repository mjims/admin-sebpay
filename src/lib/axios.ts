import type { QueryKey } from '@tanstack/react-query';
import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Cookies from 'js-cookie';

import { AuthToken, getAccessToken } from '@/lib/auth-token';
import { AppCookies } from '@/shared/config';
import { Endpoints } from '@/shared/endpoints';
import { LocalStorageKeys } from '@/shared/local-storage-keys';
import { Pages } from '@/shared/pages';
import { useServerStore } from '@/stores/server';
import { useAuthStore } from '@/stores/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noAuthAxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = getAccessToken();
     console.log('Token envoyé dans la requête:', token);
    const newConfig = { ...config };

    if (token) {
      newConfig.headers.Authorization = `JWT ${token}`;
    }

    // Si l'URL n'est pas absolue, applique baseURL manuellement
    if (baseURL && !newConfig.url?.startsWith('http')) {
      newConfig.baseURL = baseURL;
    }

    return newConfig; 
  },
  (error) => Promise.reject(error)
);

const refreshAuthLogic = async (failedRequest: {
  response: {
    config: { headers: { Authorization: string }; url: string | undefined };
  };
}) => {
  
  if (typeof window === 'undefined') return;

  if (!window.location.pathname.startsWith(Pages.BOARD)) return;

  const refreshToken = Cookies.get(AppCookies.REFRESH_TOKEN) || '';
  const defaultRedirect = Pages.BOARD;

  const lastKnownLocation =
    window.location.pathname === Pages.LOGIN
      ? defaultRedirect
      : window.location.pathname;

  if (refreshToken) {
    return axios
      .post(
        Endpoints.JWT_REFRESH,
        {
          refresh: refreshToken,
          skipAuthRefresh: true,
        },
        {
          baseURL,
        },
      )
      .then((resp) => {
        const { access: newToken } = resp.data;
        const decoded = new AuthToken(newToken);

        const newFailedRequest = { ...failedRequest };
        newFailedRequest.response.config.headers.Authorization = decoded.bearerString;

        Cookies.set(AppCookies.ACCESS_TOKEN, newToken, { secure: true });
      })
      .catch((err) => {
        localStorage.setItem(LocalStorageKeys.LAST_KNOWN_LOCATION, lastKnownLocation);

        if (
          err?.response?.status === 401 ||
          err?.response?.data?.code === 'token_not_valid'
        ) {
          useAuthStore.getState?.().setUser(undefined);
        }
      });
  }

  if (
    failedRequest?.response?.config?.url !== Endpoints.JWT_CREATE &&
    window.location.pathname !== Pages.LOGIN
  ) {
    localStorage.setItem(LocalStorageKeys.LAST_KNOWN_LOCATION, lastKnownLocation);
    useAuthStore.getState?.().setUser(undefined);
  }
};


createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export const defaultQueryFn = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<any> => {
  const url = queryKey[0] as string;

  // Effectuer la requête avec l'URL modifiée
  const { data } = await axiosInstance.get(url);
  return data;
};
