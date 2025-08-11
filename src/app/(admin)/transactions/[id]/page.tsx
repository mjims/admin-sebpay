// app/admin/transactions/[id]/page.tsx
import { notFound } from 'next/navigation'
import TransactionDetailCard from '@/components/admin/transactions/TransactionDetailCard'
import TransactionTimeline from '@/components/admin/transactions/TransactionTimeline'
import { Button } from '@/components/ui/button'

interface TransactionDetailPageProps {
  params: { id: string }
}

export default async function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  // Remplacer par un appel API réel
  const transaction = await fetchTransaction(params.id)
  
  if (!transaction) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Détails de la transaction</h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Exporter en PDF
          </Button>
          <Button variant="outline" disabled>
            Rembourser
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionDetailCard transaction={transaction} />
        </div>
        <div className="lg:col-span-1">
          <TransactionTimeline transactionId={transaction.id} />
        </div>
      </div>
    </div>
  )
}

// Fonction mock - à remplacer par un appel API réel
async function fetchTransaction(id: string) {
  return {
    id,
    reference: `TRX-${id}`,
    amount: 150.75,
    currency: 'EUR',
    status: 'completed',
    date: '2023-11-15T14:30:00Z',
    paymentMethod: 'Carte bancaire',
    sender: {
      id: 'usr-1',
      name: 'Jean Dupont',
      account: 'FR76 3000 4000 0100 1234 5678 900'
    },
    recipient: {
      id: 'usr-2',
      name: 'Marie Martin',
      account: 'FR76 5000 6000 0200 9876 5432 100'
    },
    fees: 2.50
  }
}