// components/admin/Users/UserInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Mail, Smartphone, Calendar, CreditCard, FileText, Shield } from 'lucide-react'
import { GroupAndPermissionType, UserProfile, UserRoleType } from '@/types/user'

interface UserInfoCardProps {
  user: {
    kyc_status: 'approved' | 'pending' | 'rejected'
    kyc_completed_at: string

    id: string
    value: string
    email: string
    username: string
    first_name: string
    last_name: string
    country_code: string
    dial_code: string
    phone: string
    profile?: UserProfile
    driver_id: string | null
    rental_merchant_id: string | null
    group_names: GroupAndPermissionType[]
    permission_names: GroupAndPermissionType[]
    roles: UserRoleType[]
    stripe_customer_id?: string
    is_subscription_active: boolean
    free_plan_checkout_session_url?: string
    starter_plan_checkout_session_url?: string
    customer_portal_url?: string
    is_active: boolean
    is_staff: boolean
    is_admin: boolean
    is_superuser: boolean
    password: string
    re_password: string
    date_joined: string
    last_login: string
  }
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations utilisateur</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p>{user.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Inscrit le</p>
              <p>{format(new Date(user.date_joined), 'PPP')}</p>
            </div>
          </div>

          {user.last_login && (
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dernière connexion</p>
                <p>{format(new Date(user.last_login), 'PPPp')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Statut KYC</p>
              <Badge variant={
                user.profile?.kyc_status === 'approved' ? 'success' :
                user.profile?.kyc_status === 'pending' ? 'warning' : 'destructive'
              }>
                {user.profile?.kyc_status === 'approved' ? 'Vérifié' :
                 user.profile?.kyc_status === 'pending' ? 'En attente' : 
                 user.profile?.kyc_status === 'rejected' ? 'Rejeté' : 'Not apply'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Solde</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(101000)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}