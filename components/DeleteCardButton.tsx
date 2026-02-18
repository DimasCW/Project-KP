'use client'

import { createClient } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteCardButton({ cardId }: { cardId: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
            return
        }

        setLoading(true)
        const { error } = await supabase.from('cards').delete().eq('id', cardId)

        if (error) {
            alert('Error deleting card: ' + error.message)
            setLoading(false)
        } else {
            router.refresh()
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
            title="Delete"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    )
}
