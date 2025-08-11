'use client'
import Link from 'next/link'
import { getUsers } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import UserStatusBadge from './UserStatusBadge'
import { SquarePen } from 'lucide-react'


export default function UsersTable({
  status,
  date,
}: {
  status?: boolean
  date?: string
}) {

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  console.log(users)

  const filteredUsers = users?.results.filter(tx => {
    if (status && tx.is_active !== status) return false
    if (date) {
      const txDate = new Date(tx.date_joined).toISOString().split('T')[0]
      if (txDate !== date) return false
    }
    return true
  })

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { users?.results.length === 0 && (
              <tr>
                <td colSpan={8} className='px-6 py-5 text-center text-xs font-medium text-gray-500'>Aucune données disponible</td>
                </tr>
            )}
            
            {filteredUsers?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.first_name + ' ' + user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   {/* <UserStatusBadge status={user.profile?.kyc_status } /> */}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <a href={`users/${ user.id}`}>Détails</a>
                </td>
                <td><SquarePen className='w-3 h-3'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}