import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import PublicCardWrapper from '@/components/PublicCardWrapper'

export const dynamic = 'force-dynamic'

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

    return <PublicCardWrapper data={card} />
}
