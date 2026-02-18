import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { Share2, Phone, Mail, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
// Note: We need to install qrcode.react types if not present, but it's usually fine. 
// Actually I installed qrcode.react, let's hope it works with SSR or I might need a client component for QR.
// To be safe, I'll make a client component for the QR code display to avoid hydration issues.

import ProfileView from '@/components/ProfileView'

// We'll separate the view into a component for reusability (preview)
export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const supabase = await createClient()

    const { data: card } = await supabase
        .from('cards')
        .select('*')
        .eq('username_slug', username)
        .single()

    if (!card) {
        notFound()
    }

    return <ProfileView card={card} />
}
