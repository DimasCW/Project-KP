'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Phone, Mail, Globe, MapPin } from 'lucide-react'

interface CardData {
    name: string
    job_title: string
    company_name: string
    tagline: string
    phone: string
    email: string
    website: string
    address: string
    username_slug: string
    logo_url?: string | null
}

export default function ClassicBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-blue-900 shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 border-[16px] border-white m-4"></div>

                <div className="z-10 text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-sm flex items-center justify-center text-blue-900 overflow-hidden">
                        {data.logo_url ? (
                            <img src={data.logo_url} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-serif font-bold">{data.company_name ? data.company_name.charAt(0).toUpperCase() : 'C'}</span>
                        )}
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-wider">{data.company_name || 'CLASSIC CORP'}</h1>
                    <div className="w-24 h-1 bg-white mx-auto my-3"></div>
                    <p className="tracking-widest text-sm uppercase">{data.tagline || 'EST. 2024'}</p>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-white shadow-2xl overflow-hidden flex flex-col">
                <div className="h-4 bg-blue-900 w-full top-0 absolute"></div>
                <div className="h-4 bg-blue-900 w-full bottom-0 absolute"></div>

                <div className="flex-1 flex items-center p-12">
                    <div className="flex-1">
                        <h2 className="text-blue-900 text-3xl font-serif font-bold">{data.name || 'John Doe'}</h2>
                        <p className="text-gray-500 uppercase tracking-wide text-sm mb-6">{data.job_title || 'Manager'}</p>

                        <div className="space-y-2 text-gray-700 text-sm font-medium">
                            {data.phone && <p>T: {data.phone}</p>}
                            {data.email && <p>E: {data.email}</p>}
                            {data.website && <p>W: {data.website}</p>}
                            {data.address && <p>A: {data.address}</p>}
                        </div>
                    </div>

                    <div className="ml-8 border-l-2 border-gray-200 pl-8">
                        <QRCodeSVG value={profileUrl} size={90} fgColor="#1e3a8a" />
                    </div>
                </div>
            </div>
        </div>
    )
}
