// app/actions.ts
'use server'
import { Redis } from '@upstash/redis'
import { Story } from '@/delivery-api'
import { revalidatePath } from 'next/cache'

export async function updateStory(action: { story: Story; path: string }) {
  const { story, path } = action

  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })

  const result = await redis.set('story', story)
  revalidatePath(path)
  return result
}
