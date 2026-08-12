import { neon } from '@neondatabase/serverless'

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED

if (!connectionString) {
  throw new Error(
    'No database connection string found. Set DATABASE_URL (Vercel Postgres/Neon integration) in your environment.'
  )
}

export const sql = neon(connectionString)

let schemaReady: Promise<void> | null = null

function createSchema(): Promise<void> {
  return (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        seo_title TEXT NOT NULL DEFAULT '',
        meta_description TEXT NOT NULL DEFAULT '',
        excerpt TEXT NOT NULL DEFAULT '',
        target_keyword TEXT NOT NULL DEFAULT '',
        related_keywords JSONB NOT NULL DEFAULT '[]',
        search_intent TEXT NOT NULL DEFAULT 'informational',
        difficulty TEXT NOT NULL DEFAULT 'medium',
        category TEXT NOT NULL DEFAULT '',
        tags JSONB NOT NULL DEFAULT '[]',
        author TEXT NOT NULL DEFAULT '',
        published_date TEXT NOT NULL DEFAULT '',
        modified_date TEXT NOT NULL DEFAULT '',
        featured_image_src TEXT NOT NULL DEFAULT '',
        featured_image_alt TEXT NOT NULL DEFAULT '',
        featured_image_caption TEXT NOT NULL DEFAULT '',
        featured_image_title TEXT NOT NULL DEFAULT '',
        og_image TEXT NOT NULL DEFAULT '',
        og_image_prompt TEXT NOT NULL DEFAULT '',
        robots TEXT NOT NULL DEFAULT '',
        faqs JSONB NOT NULL DEFAULT '[]',
        internal_links JSONB NOT NULL DEFAULT '[]',
        external_references JSONB NOT NULL DEFAULT '[]',
        body TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status)`
    await sql`CREATE INDEX IF NOT EXISTS posts_category_idx ON posts (category)`
  })()
}

/** Idempotent, memoized per server instance — call before any query. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) schemaReady = createSchema()
  return schemaReady
}
