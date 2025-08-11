'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Store, Mail, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { SuspendMerchantModal } from './SuspendMerchantModal'
import { resolveSuspension, suspendMerchant } from '@/lib/api'

interface MerchantDetailHeaderProps {
  merchant: {
    id: string
    business_name: string
    business_type: string
    country_code: string
    phone?: string
    real_balance?: string
    available_balance?: string
    website?: string
    description?: string
    verification_status: 'approved' | 'pending' | 'rejected'
    created_at?: string
    updated_at?: string
  }
}

export default function MerchantDetailHeader({ merchant }: MerchantDetailHeaderProps) {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)

  const statusMap = {
    approved: { label: 'Vérifié', variant: 'success' as const },
    pending: { label: 'En attente', variant: 'secondary' as const },
    rejected: { label: 'Rejeté', variant: 'destructive' as const }
  }

  const handleSuspendMerchant = async (data: {
  reason: string
  description: string
  requiredDocuments?: object
}) => {
  try {
    await suspendMerchant({
      merchant: merchant.id,
      reason: data.reason,
      description: data.description,
      ...(data.requiredDocuments && { 
        required_documents: data.requiredDocuments 
      })
    })
    // Rafraîchir les données ou afficher un message de succès
    
  } catch (error) {
    console.error('Failed to suspend merchant:', error)
    throw error
  }
}

  return (
    <div className='mb-15'>
      <SuspendMerchantModal
        open={isSuspendModalOpen}
        onOpenChange={setIsSuspendModalOpen}
        merchantId={merchant.id}
        onSuspend={handleSuspendMerchant}
      />

      <div className="gap-4 grid">
        <div className="route flex text-(size:--route-police) font-sans">
          <div className='route-item'>Dashboard</div>
          <div className='flex space-x-1 items-center'>
            <Store className="w-4 h-4" />
            <span>Merchants</span>
          </div>
        </div>
        <div className="dash-header flex justify-between p-4 bg-white">
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                <Store className="h-5 w-5 text-gray-500" />
              </div>
              
              <div>
                <h1 className="text-xl font-bold">
                  {merchant.business_name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                  
                  <Badge variant={statusMap[merchant.verification_status].variant}>
                    {statusMap[merchant.verification_status].label}
                  </Badge>
                  
                  {merchant.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-3 w-3" />
                      {merchant.phone}
                    </div>
                  )}
                  
                  {merchant.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="mr-2 h-4 w-4" />
                      <a 
                        href={merchant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {merchant.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="btn">
              {merchant.verification_status === 'approved' && (
                <Button 
                  variant="destructive"  
                  className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2"
                  onClick={() => setIsSuspendModalOpen(true)}
                >
                  Suspendre le marchant
                </Button>
              )}
              {merchant.verification_status == 'pending' && (
                <Button className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Approuver le marchant</Button>
              )}
              {merchant.verification_status == 'rejected' && (
                <Button className="bg-(image:--side-border) hover:bg-(image:--sebpay-gradient-hover) text-white p-2">Approuver le marchant</Button>
              )}
            </div>
            <div className="">
              <a href="/merchants/approved" className="border border-(--link-simple-border) p-2 hover:bg-(--link-simple-bg-hover)">Marchants actifs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )

}