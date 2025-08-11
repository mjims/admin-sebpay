'use client'
import Link from 'next/link'
import KYCStatusBadge from './KYCStatusBadge'
import { useQuery } from '@tanstack/react-query'
import { getKycs } from '@/lib/api'

interface KYCDocument {
  id: string
  user: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

export default function KYCTable() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getKycs
  })

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents?.results.map((doc) => (
            <tr key={doc.id}>
              <td className="px-6 py-4 whitespace-nowrap">{doc.merchant}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doc.document_type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <KYCStatusBadge status={doc?.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(doc.uploaded_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  href={`/admin/kyc/${doc.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Vérifier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}