'use client'
import { getWithdrawalRequests } from '@/lib/api'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'

interface PaymentLink {
  id: string
  reference: string
  amount: number | null
  currency: string
  status: 'active' | 'inactive' | 'expired'
  createdAt: string
  expiresAt: string | null
  url: string
  creator: string
}

export default function PaymentLinksTable() {
  const paymentLinks: PaymentLink[] = [
    {
      id: '1',
      reference: 'PAY-2023-11-001',
      amount: 99.99,
      currency: 'EUR',
      status: 'active',
      createdAt: '2023-11-10T09:30:00Z',
      expiresAt: '2023-12-10T09:30:00Z',
      url: 'https://pay.example.com/link/1',
      creator: 'Admin System'
    }
  ]

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Illimité'
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Référence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créé le</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expire le</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lien</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentLinks.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/payments/${link.id}`} className="font-medium text-primary hover:underline">
                    {link.reference}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {link.amount ? `${link.amount} ${link.currency}` : 'Montant libre'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={
                    link.status === 'active' ? 'success' :
                    link.status === 'expired' ? 'destructive' : 'secondary'
                  }>
                    {link.status === 'active' ? 'Actif' : 
                     link.status === 'expired' ? 'Expiré' : 'Inactif'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(link.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(link.expiresAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-xs">{link.url}</span>
                    <CopyButton value={link.url} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/admin/payments/${link.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    Gérer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}