// app/admin/withdrawals/[id]/page.tsx
import { notFound } from 'next/navigation'
import WithdrawalDetailHeader from '@/components/admin/withdrawals/WithdrawalDetailHeader'
import WithdrawalInfoCard from '@/components/admin/withdrawals/WithdrawalInfoCard'
import ApprovalActions from '@/components/admin/withdrawals/ApprovalActions'

export default async function WithdrawalDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // Remplacer par appel API
  const withdrawal = await fetchWithdrawal(params.id)
  if (!withdrawal) return notFound()

  return (
    <div className="space-y-6">
      <WithdrawalDetailHeader withdrawal={withdrawal} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WithdrawalInfoCard withdrawal={withdrawal} />
        </div>
        <div className="lg:col-span-1">
          <ApprovalActions withdrawal={withdrawal} />
        </div>
      </div>
    </div>
  )
}

// Mock function
async function fetchWithdrawal(id: string) {
  return {
    id,
    amount: 500,
    currency: 'EUR',
    status: 'pending',
    user: {
      id: 'usr-1',
      name: 'Jean Dupont'
    },
    requestedAt: '2023-11-16T09:30:00Z',
    method: 'Bank Transfer',
    accountDetails: 'FR76 3000 4000 0100 1234 5678 900'
  }
}