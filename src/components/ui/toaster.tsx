// components/ui/toaster.tsx
'use client'

import * as React from 'react'
import { Toast } from './toast'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col space-y-2">
      {toasts.map(({ id, title, description, variant, action, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="grid gap-1">
            {title && <Toast.Title>{title}</Toast.Title>}
            {description && (
              <Toast.Description>{description}</Toast.Description>
            )}
          </div>
          {action}
          <Toast.Close />
        </Toast>
      ))}
    </div>
  )
}