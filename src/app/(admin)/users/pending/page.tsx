'use client'

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'
import { getUsers } from '@/lib/api'
import { User, SquarePen } from 'lucide-react'



export default function UsersPendingPage() {
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  return (
    <div className="p-6 space-y-6">
      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <User className="w-4 h-4" />
            <span>Users</span>
          </div> 
        </div>

        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <strong>Validations en attente</strong>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/users/pending" className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Validation en attente</a>
            <a href="/users/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Utilisateurs validés</a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            {isLoading && (
              <tr className="p-6">
                <td colSpan={5} className="text-center">Chargement...</td>
              </tr>
            )}
            
            {users?.map((user) => (
              (user.is_active === false && (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.first_name+' '+ user.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800`}>
                      Inactif
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <a href={`users/${ user.id}`}>Détails</a>
                  </td>
                  <td><SquarePen className='w-3 h-3'/></td>
                </tr>
              ) )
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
