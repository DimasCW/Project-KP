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

export default function RedModernBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-white shadow-xl overflow-hidden flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center z-10">
                    {/* Red Diamond Logo Placeholder */}
                    <div className="w-20 h-20 mb-4 transform rotate-45 border-4 border-red-700 flex items-center justify-center overflow-hidden">
                        <div className="transform -rotate-45 w-full h-full flex items-center justify-center">
                            {data.logo_url ? (
                                <img src={data.logo_url} alt="Logo" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-red-700 font-bold text-3xl">M</div>
                            )}
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-widest">{data.company_name || 'LOGO TEXT'}</h2>
                    <p className="text-gray-400 text-sm tracking-widest mt-1 uppercase">{data.tagline || 'Tagline Here'}</p>
                </div>

                {/* Red Waves Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[120px]">
                    <svg viewBox="0 0 600 120" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M0 80 C 200 120 400 0 600 60 V 120 H 0 Z" fill="#991b1b" />
                        <path d="M0 60 C 200 100 400 -20 600 40 V 80 C 400 40 200 150 0 100 Z" fill="#b91c1c" />
                    </svg>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-white shadow-xl overflow-hidden flex">
                {/* Left Red Wave Background */}
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#450a0a] overflow-hidden">
                    <svg viewBox="0 0 200 350" className="absolute h-full w-[200%] left-0" preserveAspectRatio="none">
                        <path d="M0 0 H 100 C 180 100 0 200 150 350 H 0 Z" fill="#7f1d1d" />
                        <path d="M0 0 H 60 C 140 100 -20 200 100 350 H 0 Z" fill="#991b1b" />
                    </svg>
                </div>

                <div className="relative z-10 w-full flex">
                    {/* Left/Middle Empty for visual balance or logo mark */}
                    <div className="w-1/3 flex items-center justify-center">
                        <div className="bg-white p-2 rounded shadow-lg border border-red-200">
                            <QRCodeSVG value={profileUrl} size={90} fgColor="#7f1d1d" />
                        </div>
                    </div>

                    {/* Right Info */}
                    <div className="w-2/3 p-8 flex flex-col justify-between">
                        <div className="text-right border-b-2 border-red-100 pb-4">
                            <h2 className="text-2xl font-bold text-gray-800 uppercase">{data.name || 'YOUR NAME HERE'}</h2>
                            <p className="text-red-700 font-semibold tracking-wider text-sm">{data.job_title || 'YOUR TAGLINE GOES HERE'}</p>
                        </div>

                        <div className="flex flex-col gap-3 items-end mt-4">
                            {data.phone && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 text-sm">{data.phone}</span>
                                    <div className="w-6 h-6 bg-red-800 transform rotate-45 flex items-center justify-center shadow">
                                        <Phone size={10} className="text-white transform -rotate-45" />
                                    </div>
                                </div>
                            )}
                            {data.email && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 text-sm">{data.email}</span>
                                    <div className="w-6 h-6 bg-red-800 transform rotate-45 flex items-center justify-center shadow">
                                        <Mail size={10} className="text-white transform -rotate-45" />
                                    </div>
                                </div>
                            )}
                            {data.address && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 text-sm">{data.address}</span>
                                    <div className="w-6 h-6 bg-red-800 transform rotate-45 flex items-center justify-center shadow">
                                        <MapPin size={10} className="text-white transform -rotate-45" />
                                    </div>
                                </div>
                            )}
                            {data.website && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 text-sm">{data.website}</span>
                                    <div className="w-6 h-6 bg-red-800 transform rotate-45 flex items-center justify-center shadow">
                                        <Globe size={10} className="text-white transform -rotate-45" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
