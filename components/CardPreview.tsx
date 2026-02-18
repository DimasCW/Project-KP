import React from 'react'
import ModernBusinessCard from './ModernBusinessCard'
import ClassicBusinessCard from './ClassicBusinessCard'
import ElegantBusinessCard from './ElegantBusinessCard'
import CurvyBusinessCard from './CurvyBusinessCard'
import GeometricBlueBusinessCard from './GeometricBlueBusinessCard'
import RedModernBusinessCard from './RedModernBusinessCard'

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
}

export default function CardPreview({ data }: { data: CardData }) {
    switch (data.template) {
        case 'classic':
            return <ClassicBusinessCard data={data} />
        case 'elegant':
            return <ElegantBusinessCard data={data} />
        case 'curvy':
            return <CurvyBusinessCard data={data} />
        case 'geometric':
            return <GeometricBlueBusinessCard data={data} />
        case 'red-modern':
            return <RedModernBusinessCard data={data} />
        case 'modern':
        default:
            return <ModernBusinessCard data={data} />
    }
}
