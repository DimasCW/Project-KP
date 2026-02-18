import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, QrCode, Trash2, Edit, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: cards } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    E-Business Card
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-200 mr-4">
                                {user.email}
                            </span>
                            <form action="/auth/signout" method="post">
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            My Cards
                        </h2>
                        <Link
                            href="/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Card
                        </Link>
                    </div>

                    {!cards || cards.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <QrCode className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                No cards created
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Get started by creating a new digital business card.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Card
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                                {card.job_title || 'Untitled Card'}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {card.template}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                                            /{card.username_slug}
                                        </p>
                                        <div className="mt-4 flex space-x-2">
                                            {/* Actions will go here */}
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-700 flex justify-between">
                                        <Link href={`/${card.username_slug}`} className="text-blue-600 hover:text-blue-500 flex items-center text-sm">
                                            <ExternalLink className="h-4 w-4 mr-1" /> View
                                        </Link>
                                        <div className="flex space-x-3">
                                            <Link href={`/edit/${card.id}`} className="text-gray-600 hover:text-gray-500 dark:text-gray-300">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            {/* Delete button component would go here */}
                                            <button className="text-red-600 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
