// app/admin/kyc/[id]/page.tsx
import { notFound } from 'next/navigation'
import KYCDetailHeader from '@/components/admin/kyc/KYCDetailHeader'
import DocumentViewer from '@/components/admin/kyc/DocumentViewer'
import ApprovalActions from '@/components/admin/kyc/ApprovalActions'

export default async function KYCDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // Remplacer par appel API
  const document = await fetchKYCDocument(params.id)
  if (!document) return notFound()

  return (
    <div className="space-y-6">
      <KYCDetailHeader document={document} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentViewer document={document} />
        </div>
        <div className="lg:col-span-1">
          <ApprovalActions documentId={document.id} />
        </div>
      </div>
    </div>
  )
}

// Mock function
async function fetchKYCDocument(id: string) {
  return {
    id,
    type: 'Passeport',
    status: 'pending',
    user: {
      id: 'usr-1',
      name: 'Jean Dupont',
      email: 'jean@example.com'
    },
    submittedAt: '2023-11-15T10:30:00Z',
    documentUrl: '/sample-kyc.jpg',
    documentNumber: '123456789'
  }
}