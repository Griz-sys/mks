import { redirect } from 'next/navigation'
import { GOOGLE_REVIEW_URL } from '../lib/constants'

export default function ReviewRedirectPage() {
  redirect(GOOGLE_REVIEW_URL)
}
