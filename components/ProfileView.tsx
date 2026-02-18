'use client'

import { Phone, Mail, Globe, MapPin, Download, Share2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ProfileView({ card }: { card: any }) {
    const cardRef = useRef<HTMLDivElement>(null)

    const downloadPDF = async () => {
        if (!cardRef.current) return

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: '#ffffff'
            })
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            })

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
            pdf.save(`${card.username_slug}-business-card.pdf`)
        } catch (err) {
            console.error('Error generating PDF', err)
            alert('Failed to generate PDF')
        }
    }

    const profileUrl = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <div
                ref={cardRef}
                className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden ${card.template === 'classic' ? 'border-t-8 border-blue-600' : ''
                    }`}
            >
                {/* Header / Cover */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {/* Avatar Placeholder */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 flex items-center justify-center text-4xl overflow-hidden">
                            {/* Use a placeholder or actual image if available */}
                            <span className="text-gray-400">📷</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-20 pb-8 px-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {card.name || card.username_slug}
                    </h1>
                    <p className="text-blue-600 font-medium mb-4">{card.job_title}</p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                        {card.bio || 'No bio provided.'}
                    </p>

                    {/* Contact Actions */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {card.email && (
                            <a href={`mailto:${card.email}`} className="flex items-center justify-center py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                <Mail className="w-4 h-4 mr-2" />
                                Email
                            </a>
                        )}
                        {card.phone && (
                            <a href={`tel:${card.phone}`} className="flex items-center justify-center py-2 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                            </a>
                        )}
                    </div>

                    {/* QR Code Section (Hidden in PDF usually, but user asked for it) */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mt-6">
                        <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Scan to Save</p>
                        <div className="flex justify-center bg-white p-2 rounded-lg inline-block shadow-sm">
                            <QRCodeSVG value={profileUrl || `https://example.com/${card.username_slug}`} size={128} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons for Viewers */}
            <div className="mt-8 flex space-x-4">
                <button
                    onClick={downloadPDF}
                    className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-1"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Save as PDF
                </button>
                <button className="flex items-center px-6 py-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-50 transition transform hover:-translate-y-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </button>
            </div>
        </div>
    )
}
