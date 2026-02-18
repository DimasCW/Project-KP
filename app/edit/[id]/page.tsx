'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

export const dynamic = 'force-dynamic'

export default function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        username_slug: '',
        job_title: '',
        bio: '',
        phone: '',
        email: '',
        template: 'modern',
    })

    useEffect(() => {
        const fetchCard = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data, error } = await supabase
                .from('cards')
                .select('*')
                .eq('id', id)
                .eq('user_id', user.id)
                .single()

            if (error || !data) {
                alert('Card not found')
                router.push('/dashboard')
            } else {
                setFormData({
                    username_slug: data.username_slug,
                    job_title: data.job_title || '',
                    bio: data.bio || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    template: data.template || 'modern'
                })
                setLoading(false)
            }
        }
        fetchCard()
    }, [id, router, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const { error } = await supabase.from('cards').update(formData).eq('id', id)

        if (error) {
            alert('Error updating card: ' + error.message)
            setSaving(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (loading) return <div className="p-8 text-center">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Business Card</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username_slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Unique Username (Slug)
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-500 sm:text-sm">
                                /
                            </span>
                            <input
                                type="text"
                                name="username_slug"
                                id="username_slug"
                                required
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="johndoe"
                                value={formData.username_slug}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                        <input type="text" name="job_title" id="job_title" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.job_title} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                        <textarea name="bio" id="bio" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.bio} onChange={handleChange}></textarea>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Email</label>
                            <input type="email" name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                            <input type="tel" name="phone" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Template</label>
                        <select id="template" name="template" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.template} onChange={handleChange}>
                            <option value="modern">Modern</option>
                            <option value="classic">Classic</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={saving} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
