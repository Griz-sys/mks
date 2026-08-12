/**
 * Pure, dependency-free — kept out of posts.ts/db.ts on purpose so client
 * components (e.g. PostForm.tsx) can import it without pulling the Postgres
 * client into the browser bundle.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
