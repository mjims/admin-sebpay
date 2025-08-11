// components/ui/toast-provider.tsx
'use client'

import * as React from 'react'
import { ToastContext } from './toast'
import { useToast } from './use-toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast, dismiss, toasts } = useToast()

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}