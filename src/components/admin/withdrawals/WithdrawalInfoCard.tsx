// components/admin/Withdrawals/WithdrawalInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Banknote, CreditCard, User, FileText, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface WithdrawalInfoCardProps {
  withdrawal: {
    id: string
    amount: number
    currency: string
    fees: number
    netAmount: number
    requestedAt: string
    processedAt?: string
    method: string
    accountDetails: string
    reference?: string
    user: {
      id: string
      name: string
      email: string
    }
  }
}

export default function WithdrawalInfoCard({ withdrawal }: WithdrawalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du retrait</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Banknote className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Montant brut</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: withdrawal.currency
                }).format(withdrawal.amount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Frais</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: withdrawal.currency
                }).format(withdrawal.fees)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Banknote className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Montant net</p>
              <p className="font-medium">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: withdrawal.currency
                }).format(withdrawal.netAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Demandé par</p>
              <p className="font-medium">{withdrawal.user.name}</p>
              <p className="text-sm text-muted-foreground">{withdrawal.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Compte bénéficiaire</p>
              <p className="font-medium">{withdrawal.accountDetails}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date de demande</p>
              <p>{format(new Date(withdrawal.requestedAt), 'PPPp')}</p>
            </div>
          </div>

          {withdrawal.processedAt && (
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de traitement</p>
                <p>{format(new Date(withdrawal.processedAt), 'PPPp')}</p>
              </div>
            </div>
          )}
        </div>

        {withdrawal.reference && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Référence</p>
                <p className="font-medium">{withdrawal.reference}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}