import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import PublicCardWrapper from '@/components/PublicCardWrapper'

export const dynamic = 'force-dynamic'

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const supabase = await createClient()

    const { data: card } = await supabase
        .from('cards')
        .select('*, profiles(name)') // Join with profiles to get name
        .eq('username_slug', username)
        .single()

    if (!card) {
        notFound()
    }

    // Map the joined profile name to the card data structure
    const cardWithProfile = {
        ...card,
        name: card.profiles?.name || card.username_slug // Fallback to slug if name missing
    }

    return <PublicCardWrapper data={cardWithProfile} />
}
