// components/admin/Suspensions/SuspensionInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, UserX, Calendar, Shield, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface SuspensionInfoCardProps {
  suspension: {
    user: {
      id: string
      name: string
      email: string
    }
    suspendedBy: string
    suspendedAt: string
    liftedAt?: string
    liftedBy?: string
    reason: string
    notes?: string
    status: 'active' | 'lifted'
  }
}

export default function SuspensionInfoCard({ suspension }: SuspensionInfoCardProps) {
  return (
    <Card className='border border-(--link-simple-border)'>
      <CardHeader>
        <CardTitle>Détails de la suspension</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Utilisateur</p>
              <p className="font-medium">{suspension.merchant_name}</p>
              <p className="text-sm text-muted-foreground">{suspension.merchant_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Suspendu par</p>
              <p className="font-medium">{suspension.suspended_by_name}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date de suspension</p>
              <p>{format(new Date(suspension.created_at), 'PPPp')}</p>
            </div>
          </div>

          {suspension.status === 'lifted' && suspension.liftedAt && (
            <div className="flex items-center gap-3">
              <UserX className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Levée le</p>
                <p>{format(new Date(suspension.liftedAt), 'PPPp')}</p>
                {suspension.liftedBy && (
                  <p className="text-sm text-muted-foreground">Par {suspension.liftedBy}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Raison</p>
              <p className="font-medium">{suspension.reason}</p>
            </div>
          </div>
        </div>

        {suspension.notes && (
          <div className="border-t pt-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Notes supplémentaires</p>
                <p className="font-medium">{suspension.notes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}