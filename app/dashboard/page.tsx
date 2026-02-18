import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, QrCode, Edit, ExternalLink, Briefcase, Globe, MoreVertical, LogOut, User } from 'lucide-react'
import DeleteCardButton from '@/components/DeleteCardButton'

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
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
            {/* Top Navigation */}
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">E</span>
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                E-Business Card
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block pr-2">
                                    {user.email}
                                </span>
                            </div>
                            <form action="/auth/signout" method="post">
                                <button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors" title="Sign Out">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                My Cards
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                Manage and share your digital identities.
                            </p>
                        </div>
                        <Link
                            href="/create"
                            className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Card
                        </Link>
                    </div>

                    {!cards || cards.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center">
                            <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                                <QrCode className="h-10 w-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                No cards created yet
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                Get started by creating your first professional digital business card to share with your network.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/create"
                                    className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg shadow-blue-500/30 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Create First Card
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Card Header: Template Badge & Avatar */}
                                    <div className="p-6 pb-4 flex-1">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                                                {card.company_name ? card.company_name.charAt(0).toUpperCase() : (card.name ? card.name.charAt(0).toUpperCase() : 'B')}
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                                {card.template || 'Modern'}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                                            {card.name || card.company_name || 'Untitled Card'}
                                        </h3>
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate mb-1">
                                            {card.job_title || 'No Job Title'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 truncate uppercase tracking-wide">
                                            {card.company_name || 'No Company'}
                                        </p>

                                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Briefcase className="w-4 h-4 mr-3 opacity-50 flex-shrink-0" />
                                                <span className="truncate">{card.tagline || 'No tagline'}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Globe className="w-4 h-4 mr-3 opacity-50 flex-shrink-0" />
                                                <span className="truncate text-gray-500">/{card.username_slug}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer: Actions */}
                                    <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-750/50 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700 flex justify-between items-center gap-2">
                                        <Link
                                            href={`/${card.username_slug}`}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            View <ExternalLink className="h-3 w-3 ml-1.5" />
                                        </Link>

                                        <div className="flex items-center border-l border-gray-200 dark:border-gray-600 pl-2 ml-1 space-x-1">
                                            <Link
                                                href={`/edit/${card.id}`}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <DeleteCardButton cardId={card.id} />
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
