'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { savePost } from './actions'
import { slugify } from '@/app/lib/blog/slugify'
import type { PostFrontmatter } from '@/app/lib/blog/types'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type FormState = {
  title: string
  seoTitle: string
  metaDescription: string
  slug: string
  excerpt: string
  targetKeyword: string
  relatedKeywords: string[]
  searchIntent: PostFrontmatter['searchIntent']
  difficulty: PostFrontmatter['difficulty']
  category: string
  tags: string[]
  author: string
  publishedDate: string
  modifiedDate: string
  featuredImage: { src: string; alt: string; caption: string; title: string }
  ogImage: string
  ogImagePrompt: string
  faqs: { question: string; answer: string }[]
  internalLinks: { label: string; href: string }[]
  externalReferences: { label: string; url: string }[]
  robots: string
  body: string
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function emptyForm(): FormState {
  return {
    title: '',
    seoTitle: '',
    metaDescription: '',
    slug: '',
    excerpt: '',
    targetKeyword: '',
    relatedKeywords: [],
    searchIntent: 'informational',
    difficulty: 'medium',
    category: '',
    tags: [],
    author: "MK's Tandoori Team",
    publishedDate: today(),
    modifiedDate: today(),
    featuredImage: { src: '', alt: '', caption: '', title: '' },
    ogImage: '',
    ogImagePrompt: '',
    faqs: [],
    internalLinks: [],
    externalReferences: [],
    robots: '',
    body: '',
  }
}

function fromPost(post: PostFrontmatter): FormState {
  return {
    title: post.title,
    seoTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    slug: post.slug,
    excerpt: post.excerpt,
    targetKeyword: post.targetKeyword,
    relatedKeywords: post.relatedKeywords,
    searchIntent: post.searchIntent,
    difficulty: post.difficulty,
    category: post.category,
    tags: post.tags,
    author: post.author,
    publishedDate: post.publishedDate,
    modifiedDate: post.modifiedDate,
    featuredImage: {
      src: post.featuredImage.src,
      alt: post.featuredImage.alt,
      caption: post.featuredImage.caption ?? '',
      title: post.featuredImage.title ?? '',
    },
    ogImage: post.ogImage,
    ogImagePrompt: post.ogImagePrompt ?? '',
    faqs: post.faqs,
    internalLinks: post.internalLinks ?? [],
    externalReferences: post.externalReferences ?? [],
    robots: post.robots ?? '',
    body: '', // filled by the edit page from the raw body separately
  }
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Upload failed')
  return data.url as string
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string[]
  children: React.ReactNode
}) {
  return (
    <label className="block mb-5">
      <span className="block font-body text-xs uppercase tracking-widest text-ink/50 mb-1.5">{label}</span>
      {children}
      {error?.[0] && <span className="block font-body text-xs text-red-600 mt-1">{error[0]}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-ink/15 px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-terracotta'

function TagInput({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState('')

  function commit() {
    const value = draft.trim()
    if (value && !values.includes(value)) onChange([...values, value])
    setDraft('')
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((v) => (
          <span key={v} className="inline-flex items-center gap-1.5 rounded-full bg-tint/40 px-3 py-1 font-body text-xs text-ink">
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} className="text-ink/40 hover:text-red-600">
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            commit()
          }
        }}
        onBlur={commit}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  )
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadFile(file))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/image.jpg or https://…" className={inputClass} />
        <label className="rounded-xl border border-ink/15 px-3 py-2.5 font-body text-xs cursor-pointer hover:border-terracotta whitespace-nowrap">
          {uploading ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-3 h-28 rounded-xl object-cover border border-ink/10" />
      )}
    </Field>
  )
}

export default function PostForm({
  initial,
  postId,
}: {
  initial?: PostFrontmatter & { body: string }
  postId?: number
}) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() => (initial ? { ...fromPost(initial), body: initial.body } : emptyForm()))
  const [slugTouched, setSlugTouched] = useState(Boolean(initial))
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})
  const [saving, setSaving] = useState<'draft' | 'published' | null>(null)

  const metaDescCount = form.metaDescription.length
  const seoTitleCount = form.seoTitle.length

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleTitleChange(value: string) {
    update('title', value)
    if (!slugTouched) update('slug', slugify(value))
  }

  async function handleSave(status: 'draft' | 'published') {
    setSaving(status)
    setErrors({})
    const payload = { ...form, status }
    const result = await savePost(payload, postId)
    setSaving(null)
    if (result.ok) {
      router.push('/admin')
    } else {
      setErrors(result.errors)
    }
  }

  function updateFaq(index: number, key: 'question' | 'answer', value: string) {
    const next = [...form.faqs]
    next[index] = { ...next[index], [key]: value }
    update('faqs', next)
  }

  function updateInternalLink(index: number, key: 'label' | 'href', value: string) {
    const next = [...form.internalLinks]
    next[index] = { ...next[index], [key]: value }
    update('internalLinks', next)
  }

  function updateExternalReference(index: number, key: 'label' | 'url', value: string) {
    const next = [...form.externalReferences]
    next[index] = { ...next[index], [key]: value }
    update('externalReferences', next)
  }

  const editorPreview = useMemo(() => 'live' as const, [])

  return (
    <div className="max-w-3xl">
      {errors._form?.[0] && (
        <p className="font-body text-sm text-red-600 mb-4 bg-red-50 rounded-xl px-4 py-3">{errors._form[0]}</p>
      )}

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <h2 className="font-heading text-lg text-ink mb-4">Basics</h2>
        <Field label="Title (H1)" error={errors.title}>
          <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} />
        </Field>
        <Field label={`SEO Title (${seoTitleCount}/70)`} error={errors.seoTitle}>
          <input value={form.seoTitle} onChange={(e) => update('seoTitle', e.target.value)} maxLength={70} className={inputClass} />
        </Field>
        <Field label={`Meta Description (${metaDescCount}/170)`} error={errors.metaDescription}>
          <textarea
            value={form.metaDescription}
            onChange={(e) => update('metaDescription', e.target.value)}
            maxLength={170}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Slug" error={errors.slug}>
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true)
              update('slug', e.target.value)
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Excerpt" error={errors.excerpt}>
          <textarea value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} rows={2} className={inputClass} />
        </Field>
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <h2 className="font-heading text-lg text-ink mb-4">SEO &amp; Intent</h2>
        <Field label="Target Keyword" error={errors.targetKeyword}>
          <input value={form.targetKeyword} onChange={(e) => update('targetKeyword', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Related Keywords">
          <TagInput values={form.relatedKeywords} onChange={(v) => update('relatedKeywords', v)} placeholder="Type and press Enter" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Search Intent">
            <select value={form.searchIntent} onChange={(e) => update('searchIntent', e.target.value as FormState['searchIntent'])} className={inputClass}>
              <option value="informational">Informational</option>
              <option value="commercial">Commercial</option>
              <option value="navigational">Navigational</option>
              <option value="transactional">Transactional</option>
            </select>
          </Field>
          <Field label="Difficulty">
            <select value={form.difficulty} onChange={(e) => update('difficulty', e.target.value as FormState['difficulty'])} className={inputClass}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </Field>
        </div>
        <Field label="Robots (optional — e.g. noindex, nofollow)">
          <input value={form.robots} onChange={(e) => update('robots', e.target.value)} className={inputClass} />
        </Field>
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <h2 className="font-heading text-lg text-ink mb-4">Taxonomy &amp; Author</h2>
        <Field label="Category" error={errors.category}>
          <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Tags" error={errors.tags}>
          <TagInput values={form.tags} onChange={(v) => update('tags', v)} placeholder="Type and press Enter" />
        </Field>
        <Field label="Author" error={errors.author}>
          <input value={form.author} onChange={(e) => update('author', e.target.value)} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Published Date" error={errors.publishedDate}>
            <input type="date" value={form.publishedDate} onChange={(e) => update('publishedDate', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Modified Date" error={errors.modifiedDate}>
            <input type="date" value={form.modifiedDate} onChange={(e) => update('modifiedDate', e.target.value)} className={inputClass} />
          </Field>
        </div>
        <p className="font-body text-xs text-ink/40 -mt-3 mb-2">
          To schedule a post, set a future Published Date and click Publish — it stays hidden and shows as
          &ldquo;scheduled&rdquo; here until that date arrives (may take up to ~1 hour past midnight to actually appear).
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <h2 className="font-heading text-lg text-ink mb-4">Images</h2>
        <ImageField label="Featured Image" value={form.featuredImage.src} onChange={(url) => update('featuredImage', { ...form.featuredImage, src: url })} />
        <Field label="Featured Image Alt Text" error={errors.featuredImage}>
          <input value={form.featuredImage.alt} onChange={(e) => update('featuredImage', { ...form.featuredImage, alt: e.target.value })} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Caption">
            <input value={form.featuredImage.caption} onChange={(e) => update('featuredImage', { ...form.featuredImage, caption: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Title Attribute">
            <input value={form.featuredImage.title} onChange={(e) => update('featuredImage', { ...form.featuredImage, title: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <ImageField label="OG Image (social share)" value={form.ogImage} onChange={(url) => update('ogImage', url)} />
        <Field label="OG Image Prompt (optional, for generating one)">
          <textarea value={form.ogImagePrompt} onChange={(e) => update('ogImagePrompt', e.target.value)} rows={2} className={inputClass} />
        </Field>
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg text-ink">FAQs</h2>
          <button
            type="button"
            onClick={() => update('faqs', [...form.faqs, { question: '', answer: '' }])}
            className="font-body text-xs text-terracotta hover:underline"
          >
            + Add FAQ
          </button>
        </div>
        {form.faqs.map((faq, i) => (
          <div key={i} className="border border-ink/10 rounded-xl p-4 mb-3">
            <input
              value={faq.question}
              onChange={(e) => updateFaq(i, 'question', e.target.value)}
              placeholder="Question"
              className={`${inputClass} mb-2`}
            />
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(i, 'answer', e.target.value)}
              placeholder="Answer"
              rows={2}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => update('faqs', form.faqs.filter((_, idx) => idx !== i))}
              className="font-body text-xs text-red-600 hover:underline mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg text-ink">Internal Links</h2>
          <button
            type="button"
            onClick={() => update('internalLinks', [...form.internalLinks, { label: '', href: '' }])}
            className="font-body text-xs text-terracotta hover:underline"
          >
            + Add Link
          </button>
        </div>
        {form.internalLinks.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={link.label}
              onChange={(e) => updateInternalLink(i, 'label', e.target.value)}
              placeholder="Label"
              className={inputClass}
            />
            <input
              value={link.href}
              onChange={(e) => updateInternalLink(i, 'href', e.target.value)}
              placeholder="/#menu"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => update('internalLinks', form.internalLinks.filter((_, idx) => idx !== i))}
              className="font-body text-xs text-red-600 hover:underline flex-shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg text-ink">External References</h2>
          <button
            type="button"
            onClick={() => update('externalReferences', [...form.externalReferences, { label: '', url: '' }])}
            className="font-body text-xs text-terracotta hover:underline"
          >
            + Add Reference
          </button>
        </div>
        {form.externalReferences.map((ref, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={ref.label}
              onChange={(e) => updateExternalReference(i, 'label', e.target.value)}
              placeholder="Label"
              className={inputClass}
            />
            <input
              value={ref.url}
              onChange={(e) => updateExternalReference(i, 'url', e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => update('externalReferences', form.externalReferences.filter((_, idx) => idx !== i))}
              className="font-body text-xs text-red-600 hover:underline flex-shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl border border-ink/10 p-6 mb-6">
        <h2 className="font-heading text-lg text-ink mb-4">Body</h2>
        {errors.body?.[0] && <p className="font-body text-xs text-red-600 mb-2">{errors.body[0]}</p>}
        <div data-color-mode="light">
          <MDEditor value={form.body} onChange={(v) => update('body', v ?? '')} height={500} preview={editorPreview} />
        </div>
      </section>

      <div className="flex gap-3 sticky bottom-0 bg-paper/95 backdrop-blur-sm border-t border-ink/10 py-4 z-10">
        <button
          type="button"
          onClick={() => handleSave('draft')}
          disabled={saving !== null}
          className="rounded-full border border-ink/20 bg-white font-body font-semibold text-sm px-6 py-3 hover:border-terracotta disabled:opacity-60"
        >
          {saving === 'draft' ? 'Saving…' : 'Save Draft'}
        </button>
        <button
          type="button"
          onClick={() => handleSave('published')}
          disabled={saving !== null}
          className="rounded-full bg-terracotta text-white font-body font-semibold text-sm px-6 py-3 hover:brightness-95 disabled:opacity-60"
        >
          {saving === 'published' ? 'Publishing…' : 'Publish'}
        </button>
      </div>
    </div>
  )
}
