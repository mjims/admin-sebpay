import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'

interface TransactionDetailCardProps {
  transaction: {
    id: string
    reference: string
    amount: number
    currency: string
    status: string
    date: string
    paymentMethod: string
    sender: {
      id: string
      name: string
      account: string
    }
    recipient: {
      id: string
      name: string
      account: string
    }
    fees: number
  }
}

export default function TransactionDetailCard({ transaction }: TransactionDetailCardProps) {
  const statusMap = {
    completed: { label: 'Complétée', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    failed: { label: 'Échouée', variant: 'destructive' as const },
    refunded: { label: 'Remboursée', variant: 'default' as const }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Référence: {transaction.reference}</span>
          <Badge variant={statusMap[transaction.status].variant}>
            {statusMap[transaction.status].label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Montant</h3>
            <p className="text-xl font-semibold">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: transaction.currency
              }).format(transaction.amount)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Frais: {transaction.fees} {transaction.currency}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
            <p>{format(new Date(transaction.date), 'PPPp')}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Expéditeur</h3>
          <div className="space-y-2">
            <p className="font-medium">
              <Link href={`/admin/users/${transaction.sender.id}`} className="hover:underline">
                {transaction.sender.name}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.sender.account}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Destinataire</h3>
          <div className="space-y-2">
            <p className="font-medium">
              <Link href={`/admin/users/${transaction.recipient.id}`} className="hover:underline">
                {transaction.recipient.name}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.recipient.account}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Méthode de paiement</h3>
          <p>{transaction.paymentMethod}</p>
        </div>
      </CardContent>
    </Card>
  )
}