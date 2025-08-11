// components/admin/Users/UserDetailHeader.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'

interface UserDetailHeaderProps {
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
    is_active: boolean
  }
}

export default function UserDetailHeader({ user }: UserDetailHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                {user.email}
              </div>
              <Badge variant={user.is_active === true ? 'success' : 'destructive'}>
                {user.is_active === true ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}