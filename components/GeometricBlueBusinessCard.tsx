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

export default function GeometricBlueBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-white shadow-xl overflow-hidden flex">
                {/* Left Side: Logo & Company */}
                <div className="w-1/3 flex flex-col items-center justify-center border-r border-gray-200 p-6">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center text-cyan-600">
                        {data.logo_url ? (
                            <img src={data.logo_url} alt="Logo" className="w-full h-full object-contain" />
                        ) : (
                            // Geometric Triangle Logo Placeholder
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <path d="M50 0 L100 100 H0 Z" />
                                <circle cx="50" cy="60" r="15" fill="white" />
                            </svg>
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 text-center leading-tight uppercase">{data.company_name || 'COMPANY LOGO'}</h2>
                    <p className="text-cyan-500 text-xs tracking-widest mt-1 uppercase">{data.tagline || 'TAGLINE HERE'}</p>
                </div>

                {/* Right Side: Info */}
                <div className="w-2/3 p-10 flex flex-col justify-center relative">
                    <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gray-300"></div>

                    <div className="pl-6 mb-8">
                        <h1 className="text-4xl text-gray-600 font-light uppercase tracking-wide">
                            {data.name?.split(' ')[0] || 'MICHAL'} <span className="text-cyan-600 font-bold">{data.name?.split(' ').slice(1).join(' ') || 'JOHNS'}</span>
                        </h1>
                        <p className="text-gray-400 text-sm tracking-widest mt-1 uppercase">{data.job_title || 'CREATIVE DESIGNER'}</p>
                    </div>

                    <div className="pl-6 space-y-3 text-gray-500 text-sm">
                        {data.phone && (
                            <div className="flex items-center gap-4">
                                <Phone size={16} strokeWidth={1.5} />
                                <span className="tracking-wider">{data.phone}</span>
                            </div>
                        )}
                        {data.email && (
                            <div className="flex items-center gap-4">
                                <Mail size={16} strokeWidth={1.5} />
                                <span className="tracking-wider">{data.email}</span>
                            </div>
                        )}
                        {data.address && (
                            <div className="flex items-center gap-4">
                                <MapPin size={16} strokeWidth={1.5} />
                                <span className="tracking-wider">{data.address}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-cyan-700 shadow-xl overflow-hidden flex flex-col items-center justify-center text-white">
                <div className="w-24 h-24 mb-6 bg-white rounded-full flex items-center justify-center text-cyan-700 p-4">
                    {data.logo_url ? (
                        <img src={data.logo_url} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                            <path d="M50 0 L100 100 H0 Z" />
                        </svg>
                    )}
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.company_name || 'COMPANY LOGO'}</h2>
                <p className="text-cyan-200 text-sm tracking-[0.3em] uppercase mb-8">{data.tagline || 'TAGLINE HERE'}</p>

                <div className="border-t border-cyan-500 pt-6 mt-2">
                    <p className="text-white tracking-widest">{data.website || 'www.websiteurl.com'}</p>
                </div>

                {/* QR Code in corner */}
                <div className="absolute bottom-4 right-4 bg-white p-1">
                    <QRCodeSVG value={profileUrl} size={60} />
                </div>
            </div>
        </div>
    )
}
