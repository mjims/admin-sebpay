// services/users.ts
import { apiRequest } from '@/lib/api'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  date_joined: string
  // ... autres champs
}

export async function fetchUsers(params = {}): Promise<{ results: User[]; count: number }> {
  return apiRequest({
    url: '/api/users/',
    method: 'GET',
    headers: {
      // Ajouter l'authentification si nécessaire
    }
  })
}

export async function fetchUserDetails(id: string): Promise<User> {
  return apiRequest({
    url: `/api/users/${id}/`,
    method: 'GET'
  })
}

export async function suspendUser(id: string, reason: string): Promise<void> {
  return apiRequest({
    url: '/api/account-suspensions/',
    method: 'POST',
    data: {
      user: id,
      reason
    }
  })
}