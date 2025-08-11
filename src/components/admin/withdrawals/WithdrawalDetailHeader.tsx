// components/admin/Withdrawals/WithdrawalDetailHeader.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Banknote, User, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

interface WithdrawalDetailHeaderProps {
  withdrawal: {
    id: string
    amount: number
    currency: string
    status: 'pending' | 'processed' | 'rejected' | 'completed'
    user: {
      id: string
      name: string
    }
    requestedAt: string
    method: string
  }
}

export default function WithdrawalDetailHeader({ withdrawal }: WithdrawalDetailHeaderProps) {
  const statusMap = {
    pending: { label: 'En attente', variant: 'secondary' as const },
    processed: { label: 'Traité', variant: 'success' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const },
    completed: { label: 'Complété', variant: 'default' as const }
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <Link href="/admin/withdrawals" className="flex items-center text-sm text-muted-foreground mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Retour à la liste
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
            <Banknote className="h-8 w-8 text-gray-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              Retrait de {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: withdrawal.currency
              }).format(withdrawal.amount)}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <Link href={`/admin/users/${withdrawal.user.id}`} className="hover:underline">
                  {withdrawal.user.name}
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(withdrawal.requestedAt), 'PPP')}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {format(new Date(withdrawal.requestedAt), 'p')}
              </div>
              
              <Badge variant={statusMap[withdrawal.status].variant}>
                {statusMap[withdrawal.status].label}
              </Badge>
              
              <span className="text-sm text-muted-foreground">
                Méthode: {withdrawal.method}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {withdrawal.status === 'pending' && (
          <>
            <Button variant="outline">Rejeter</Button>
            <Button>Approuver</Button>
          </>
        )}
        <Button variant="outline">Exporter</Button>
      </div>
    </div>
  )
}