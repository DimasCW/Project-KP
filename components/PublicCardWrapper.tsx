'use client'

import React, { useRef, useState } from 'react'
import CardPreview from './CardPreview'
import { Download, Share2, Copy, Check } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { QRCodeSVG } from 'qrcode.react'

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
    template?: string
    logo_url?: string | null
    bio?: string
}

export default function PublicCardWrapper({ data }: { data: CardData }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)

    const downloadPDF = async () => {
        if (!cardRef.current) return

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: null,
                logging: false,
                useCORS: true
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            })

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
            pdf.save(`${data.username_slug}-card.pdf`)
        } catch (err) {
            console.error('Error generating PDF', err)
            alert('Failed to generate PDF')
        }
    }

    const shareCard = async () => {
        const url = window.location.href
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${data.name} - Digital Business Card`,
                    text: `Check out ${data.name}'s digital business card!`,
                    url: url
                })
            } catch (err) {
                console.log('Error sharing', err)
            }
        } else {
            console.log('Web Share API not supported, copying to clipboard')
            navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">

            {/* Card Container - Scaled for mobile */}
            <div className="w-full flex justify-center mb-10 overflow-hidden py-8">
                <div className="transform scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 transition-transform origin-center">
                    <div ref={cardRef} className="inline-block shadow-2xl rounded-xl overflow-hidden">
                        <CardPreview data={data} />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={downloadPDF}
                        className="flex items-center justify-center px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-semibold"
                    >
                        <Download className="w-5 h-5 mr-3" />
                        Save PDF
                    </button>
                    <button
                        onClick={shareCard}
                        className="flex items-center justify-center px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-semibold"
                    >
                        {copied ? <Check className="w-5 h-5 mr-3 text-green-500" /> : <Share2 className="w-5 h-5 mr-3" />}
                        {copied ? 'Copied!' : 'Share'}
                    </button>
                </div>

                {/* Bio / Extra Info Toggle could go here if needed, but for now keeping it simple as per "Business Card" metaphor */}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Scan Code</p>
                <div className="bg-white p-3 rounded-xl shadow-sm inline-block">
                    <QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : `https://example.com/${data.username_slug}`} size={100} />
                </div>
            </div>

        </div>
    )
}
