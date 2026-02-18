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

export default function ElegantBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-black shadow-2xl overflow-hidden flex items-center justify-center">
                {/* Gold Gradient Border */}
                <div className="absolute inset-0 border-[2px] border-[#d4af37] m-3 opacity-50"></div>
                <div className="absolute inset-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111] to-transparent"></div>

                <div className="z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] overflow-hidden">
                        {data.logo_url ? (
                            <img src={data.logo_url} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-light italic">{data.company_name ? data.company_name.charAt(0).toUpperCase() : 'E'}</span>
                        )}
                    </div>
                    <h1 className="text-4xl text-white font-light tracking-[0.2em] uppercase">{data.company_name || 'ELEGANCE'}</h1>
                    <p className="text-[#d4af37] text-xs mt-3 tracking-[0.3em] uppercase">{data.tagline || 'PREMIUM SERVICE'}</p>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-[#1a1a1a] shadow-2xl overflow-hidden flex">
                <div className="w-1/2 p-10 flex flex-col justify-center border-r border-gray-800">
                    <h2 className="text-[#d4af37] text-2xl font-light uppercase tracking-widest mb-1">{data.name?.split(' ')[0] || 'YOUR'}</h2>
                    <h2 className="text-white text-2xl font-bold uppercase tracking-widest mb-4">{data.name?.split(' ').slice(1).join(' ') || 'NAME'}</h2>
                    <p className="text-gray-500 text-xs tracking-widest uppercase mb-8">{data.job_title || 'EXECUTIVE DIRECTOR'}</p>

                    <div className="mt-auto">
                        <QRCodeSVG value={profileUrl} size={80} fgColor="#d4af37" bgColor="transparent" />
                    </div>
                </div>

                <div className="w-1/2 p-10 flex flex-col justify-center items-end text-right">
                    <div className="space-y-6 text-sm font-light text-gray-300">
                        {data.phone && (
                            <div className="flex items-center justify-end gap-3 group">
                                <span className="group-hover:text-[#d4af37] transition-colors">{data.phone}</span>
                                <Phone size={14} className="text-[#d4af37]" />
                            </div>
                        )}
                        {data.email && (
                            <div className="flex items-center justify-end gap-3 group">
                                <span className="group-hover:text-[#d4af37] transition-colors">{data.email}</span>
                                <Mail size={14} className="text-[#d4af37]" />
                            </div>
                        )}
                        {data.website && (
                            <div className="flex items-center justify-end gap-3 group">
                                <span className="group-hover:text-[#d4af37] transition-colors">{data.website}</span>
                                <Globe size={14} className="text-[#d4af37]" />
                            </div>
                        )}
                        {data.address && (
                            <div className="flex items-center justify-end gap-3 group">
                                <span className="group-hover:text-[#d4af37] transition-colors max-w-[150px] leading-tight">{data.address}</span>
                                <MapPin size={14} className="text-[#d4af37]" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
