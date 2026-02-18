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

export default function ModernBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-white shadow-xl overflow-hidden flex flex-col items-center justify-center border-l-8 border-gray-900">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    {/* Abstract BG element */}
                    <div className="w-64 h-64 rounded-full border-4 border-gray-900"></div>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 rounded-full bg-gray-900 flex items-center justify-center text-white overflow-hidden">
                        {data.logo_url ? (
                            <img src={data.logo_url} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-light">{data.company_name ? data.company_name.charAt(0).toUpperCase() : 'M'}</span>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight uppercase">{data.company_name || 'MODERN INC.'}</h1>
                    <p className="text-gray-500 tracking-widest text-sm mt-2 uppercase">{data.tagline || 'Simplicity is Key'}</p>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-gray-900 shadow-xl overflow-hidden flex">
                <div className="w-2/3 p-12 flex flex-col justify-center text-white">
                    <h2 className="text-3xl font-bold mb-1">{data.name || 'YOUR NAME'}</h2>
                    <p className="text-gray-400 text-sm tracking-wider uppercase mb-8">{data.job_title || 'JOB TITLE'}</p>

                    <div className="space-y-3 text-sm text-gray-300">
                        {data.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="text-white" />
                                <span>{data.phone}</span>
                            </div>
                        )}
                        {data.email && (
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-white" />
                                <span>{data.email}</span>
                            </div>
                        )}
                        {data.website && (
                            <div className="flex items-center gap-3">
                                <Globe size={14} className="text-white" />
                                <span>{data.website}</span>
                            </div>
                        )}
                        {data.address && (
                            <div className="flex items-center gap-3">
                                <MapPin size={14} className="text-white" />
                                <span>{data.address}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-1/3 bg-white p-6 flex flex-col items-center justify-center relative">
                    {/* Triangle shape divider */}
                    <div className="absolute left-[-20px] top-0 bottom-0 w-0 h-0 border-t-[350px] border-t-white border-l-[40px] border-l-transparent pointer-events-none transform rotate-180 scale-y-[-1]"></div>

                    <div className="z-10">
                        <QRCodeSVG value={profileUrl} size={100} />
                    </div>
                </div>
            </div>
        </div>
    )
}
