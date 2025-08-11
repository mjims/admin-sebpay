import MerchantsApprovedTable from '@/components/admin/merchants/MerchantsApprovedTable'
import { Store } from 'lucide-react'

export default function MerchantsPage() {
  return (
    <div className="p-6 space-y-6">      
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center route-item'>
            <Store className="w-4 h-4" />
            <span>Merchants</span>
          </div>
          <div>Actifs</div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Merchants actifs</strong>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn">
              <a href="/suspensions" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Marchants suspendus</a>
            </div>
            <div className="">
              <a href="/merchants/pending" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Marchants en attente</a>
            </div>
          </div>
        </div>
      </div>
      
      <MerchantsApprovedTable />
    </div>
  )
}