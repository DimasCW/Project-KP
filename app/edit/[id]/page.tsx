'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import CardPreview from '@/components/CardPreview'
import { ChevronLeft, Upload, Loader2, Save } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        username_slug: '',
        name: '',
        job_title: '',
        company_name: '',
        tagline: '',
        bio: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        template: 'modern',
        logo_url: null as string | null
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
                let cardName = data.name || ''
                if (!cardName) {
                    const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single()
                    if (profile) cardName = profile.name
                }

                setFormData({
                    username_slug: data.username_slug,
                    name: cardName,
                    job_title: data.job_title || '',
                    company_name: data.company_name || '',
                    tagline: data.tagline || '',
                    bio: data.bio || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    website: data.website || '',
                    address: data.address || '',
                    template: data.template || 'modern',
                    logo_url: data.logo_url || null
                })
                setLoading(false)
            }
        }
        fetchCard()
    }, [id, router, supabase])

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        setUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage.from('logos').upload(filePath, file)

        if (uploadError) {
            alert('Error uploading logo: ' + uploadError.message)
            setUploading(false)
            return
        }

        const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(filePath)

        setFormData({ ...formData, logo_url: publicUrl })
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const { error } = await supabase.from('cards').update({
            username_slug: formData.username_slug,
            job_title: formData.job_title,
            company_name: formData.company_name,
            tagline: formData.tagline,
            bio: formData.bio,
            phone: formData.phone,
            email: formData.email,
            website: formData.website,
            address: formData.address,
            template: formData.template,
            logo_url: formData.logo_url
        }).eq('id', id)

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

    if (loading) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-500">Loading card details...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Business Card</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update your card details and changes will be live instantly.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Side: Form */}
                    <div className="lg:col-span-6 space-y-6">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">

                            {/* Personal Info Section */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                    Personal Info
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                                        <input type="text" name="name" disabled className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 sm:text-sm py-2.5 cursor-not-allowed" value={formData.name} />
                                        <p className="text-xs text-gray-500 mt-1">To change display name, update your main profile settings.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                                        <input type="text" name="job_title" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.job_title} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Company Info Section */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                    Company Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Logo</label>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 border-dashed ${formData.logo_url ? 'border-transparent p-0 overflow-hidden' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}>
                                                {formData.logo_url ? (
                                                    <img src={formData.logo_url} alt="Logo Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400 cursor-pointer"
                                                    disabled={uploading}
                                                />
                                                {uploading && <p className="text-xs text-blue-500 mt-1 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Uploading...</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                                            <input type="text" name="company_name" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.company_name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline / Slogan</label>
                                            <input type="text" name="tagline" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.tagline} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">https://</span>
                                            </div>
                                            <input type="text" name="website" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 pl-16 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.website} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                                        <input type="text" name="address" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.address} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info Section */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                                    Contact & Social
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input type="email" name="email" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                            <input type="tel" name="phone" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5" value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unique Username (Slug)</label>
                                        <div className="flex rounded-lg shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 sm:text-sm">ecard.com/</span>
                                            <input type="text" name="username_slug" required className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-r-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.username_slug} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Template Selection */}
                            <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                                <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template Style</label>
                                <select id="template" name="template" className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg dark:bg-gray-800 dark:text-white shadow-sm" value={formData.template} onChange={handleChange}>
                                    <option value="curvy">Curvy (Creative Yellow)</option>
                                    <option value="modern">Modern (Clean & Minimalist)</option>
                                    <option value="classic">Classic (Professional Blue)</option>
                                    <option value="elegant">Elegant (Dark & Gold)</option>
                                    <option value="geometric">Geometric (Blue & Clean)</option>
                                    <option value="red-modern">Red Modern (Wave & Bold)</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                                <button type="submit" disabled={saving || uploading} className="inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-lg shadow-blue-500/30 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 w-full sm:w-auto">
                                    {saving ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="-ml-1 mr-2 h-5 w-5" />
                                            Update Card
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Live Preview */}
                    <div className="lg:col-span-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h2>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium rounded-md capitalize">{formData.template.replace('-', ' ')}</span>
                            </div>

                            <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-4 sm:p-8 flex justify-center items-center shadow-inner min-h-[550px] border border-gray-200 dark:border-gray-800 overflow-hidden relative">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                <div className="relative transform transition-transform duration-300 origin-center scale-[0.6] sm:scale-75 md:scale-90 xl:scale-100">
                                    <div className="shadow-2xl rounded-xl overflow-hidden">
                                        <CardPreview data={formData} />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                Changes are saved instantly when you click update.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
