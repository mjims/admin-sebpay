"use client"

import { useRouter } from 'next/navigation'
import StatsCard from '@/components/admin/Dashboard/StatsCards'
import RecentActivity from '@/components/admin/Dashboard/RecentActivity'
import { LayoutDashboard } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getKycs, getTransactions, getUsers } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })
  console.log(transactions)

  const { data: kycs } = useQuery({
    queryKey: ['kycs'],
    queryFn: getKycs
  })

  const stats = [
    { title: "Utilisateurs", value: users?.count, change: "+12%" },
    { title: "Transactions", value: transactions?.count, change: "+8%" },
    { title: "KYC en attente", value: kycs?.count, change: "-5%" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-[16px] font-bold font-sans items-center space-x-1">
          <LayoutDashboard className="w-4 h-4" />
          <div className=''>Tableau de bord</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <RecentActivity />
      </div>
    </div>
  )
}