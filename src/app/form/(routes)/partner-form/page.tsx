import PartnerForm from '@/app/components/PartnerForm'
import React from 'react'

export const metadata = { title: 'Become a Partner' }

export default function Page() {
  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[760px] bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-center text-2xl font-semibold mb-1">Join Beyond Moksha as a Verified Partner</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Fill out the form to become a verified partner and serve families with dignity.</p>
        <PartnerForm />
      </div>
    </div>
  )
}
