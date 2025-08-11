import TransactionsTable from '@/components/admin/transactions/TransactionsTable'
import TransactionFilters from '@/components/admin/transactions/Filters'
import { DollarSign } from 'lucide-react'

export default function TransactionsPage({
  searchParams,
}: {
  searchParams: { status?: string; date?: string }
}) {
  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <DollarSign className="w-4 h-4" />
            <span>Transactions</span>
          </div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Transactions</strong>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn">
              <a href="/transactions/all" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Hitorique</a>
            </div>
            <div className="">
              <a href="/transactions/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Transactions  approuvés</a>
            </div>
          </div>
        </div>

        <TransactionFilters /> 
      </div>

      <TransactionsTable status={searchParams.status} date={searchParams.date} />
    </div>
  )
}