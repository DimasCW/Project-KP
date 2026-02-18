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

export default function CurvyBusinessCard({ data }: { data: CardData }) {
    const [profileUrl, setProfileUrl] = React.useState('')

    React.useEffect(() => {
        setProfileUrl(`${window.location.origin}/${data.username_slug}`)
    }, [data.username_slug])

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            {/* Front Side */}
            <div id="card-front" className="relative w-[600px] h-[350px] bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                {/* Yellow Wave Top Left */}
                <div className="absolute top-[-50px] left-[-50px] w-[400px] h-[400px] bg-[#f5bf23] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                {/* Background Waves CSS Implementation using SVG for precision matches the reference */}
                <div className="absolute inset-0 z-0">
                    <svg viewBox="0 0 600 350" className="w-full h-full">
                        <path d="M0,0 L250,0 C150,150 50,100 0,300 Z" fill="#1f2937" />
                        <path d="M0,0 L400,0 C300,200 100,200 0,350 Z" fill="#f59e0b" opacity="0.8" />
                        <path d="M600,350 L350,350 C450,200 550,250 600,50 Z" fill="#1f2937" />
                        <path d="M600,350 L200,350 C300,150 500,150 600,0 Z" fill="#f59e0b" opacity="0.8" />
                    </svg>
                </div>

                {/* Customized SVG Paths to match the specific "Curvy" look more closely */}
                <div className="absolute inset-0 z-0 bg-white">
                    {/* Top Left Yellow */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                        <path d="M0 0 H350 C200 50 150 150 0 200 V0 Z" fill="#f5bf23" />
                        <path d="M0 150 C100 100 250 80 400 0 H600 V100 C400 150 200 250 0 280 Z" fill="#f5bf23" opacity="0.6" />
                        <path d="M0 220 C100 200 300 200 600 50 V0 H0 Z" fill="#1f2937" />
                    </svg>

                    {/* Bottom Right Dark */}
                    <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                        <path d="M600 350 H250 C400 300 450 200 600 150 V350 Z" fill="#1f2937" />
                        <path d="M600 200 C500 250 350 270 200 350 H0 V350 C200 300 400 200 600 120 Z" fill="#f5bf23" />
                    </svg>
                </div>

                <div className="relative z-10 text-center">
                    <div className="mb-2">
                        {/* Logo Placeholder or Image */}
                        <div className="w-16 h-16 mx-auto border-4 border-gray-800 rounded-full flex items-center justify-center bg-white overflow-hidden relative">
                            {data.logo_url ? (
                                <img src={data.logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-gray-800">
                                    {data.company_name ? data.company_name.charAt(0).toUpperCase() : 'C'}
                                </span>
                            )}
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-widest">{data.company_name || 'COMPANY NAME'}</h1>
                    <p className="text-[#f5bf23] tracking-widest text-sm font-semibold mt-1">{data.tagline || 'SLOGAN GOES HERE'}</p>
                </div>

                <div className="absolute bottom-6 w-full text-center z-10">
                    <p className="text-white text-sm tracking-wider">{data.website || 'WWW.YOURWEBSITE.COM'}</p>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" className="relative w-[600px] h-[350px] bg-white shadow-2xl overflow-hidden">
                {/* Background Design Re-used/Mirrored */}
                <div className="absolute inset-0 z-0 bg-white">
                    <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                        <path d="M600 0 H300 C450 100 500 200 600 350 V0 Z" fill="#f5bf23" />
                        <path d="M600 0 H200 C350 50 450 200 600 300 V0 Z" fill="#ffffff" />
                        <path d="M600 0 C400 100 300 250 200 350 H600 V0 Z" fill="#f5bf23" opacity="0.9" />
                    </svg>

                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                        <path d="M0 350 C150 250 250 150 400 0 H0 V350 Z" fill="#1f2937" />
                        <path d="M0 350 C100 250 300 200 500 350 H0 Z" fill="#1f2937" opacity="0.4" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full">
                    {/* Left Info Section */}
                    <div className="w-1/2 p-10 flex flex-col justify-center text-white">
                        <div className="mb-8">
                            {/* Small Logo */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 border-2 border-[#f5bf23] rounded-full flex items-center justify-center bg-transparent text-white font-bold overflow-hidden">
                                    {data.logo_url ? (
                                        <img src={data.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        data.company_name ? data.company_name.charAt(0).toUpperCase() : 'C'
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold uppercase">{data.company_name}</h2>
                                    <p className="text-[10px] text-[#f5bf23] uppercase">{data.tagline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {data.address && (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#f5bf23] rounded-full flex items-center justify-center text-gray-900"><MapPin size={12} /></div>
                                    <span className="text-xs">{data.address}</span>
                                </div>
                            )}
                            {data.email && (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#f5bf23] rounded-full flex items-center justify-center text-gray-900"><Mail size={12} /></div>
                                    <span className="text-xs">{data.email}</span>
                                </div>
                            )}
                            {data.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#f5bf23] rounded-full flex items-center justify-center text-gray-900"><Phone size={12} /></div>
                                    <span className="text-xs">{data.phone}</span>
                                </div>
                            )}
                            {data.website && (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#f5bf23] rounded-full flex items-center justify-center text-gray-900"><Globe size={12} /></div>
                                    <span className="text-xs">{data.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Name & QR Section */}
                    <div className="w-1/2 p-8 flex flex-col justify-center items-end text-right">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 uppercase text-[#f5bf23]">{data.name}</h1>
                            <p className="text-gray-600 font-bold uppercase tracking-wider">{data.job_title}</p>
                        </div>

                        <div className="bg-white p-2 shadow-lg rounded-lg">
                            <QRCodeSVG value={profileUrl} size={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
