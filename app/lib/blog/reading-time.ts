import readingTime from 'reading-time'

export function getReadingTime(rawContent: string): { text: string; minutes: number } {
  const result = readingTime(rawContent)
  const minutes = Math.max(1, Math.ceil(result.minutes))
  return { text: `${minutes} min read`, minutes }
}
