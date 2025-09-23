import { ClientContentView } from './ClientContentView'
import { fetchStory } from './fetchStory'
import {
  array,
  formatResult,
  object,
  parseString,
  withDefault,
} from 'pure-parse'
import { notFound } from 'next/navigation'
import { parseBridgeSearchParams } from './BridgeSearchParams'
import { updateStory } from '@/app/[[...slugs]]/actions'
import { Redis } from '@upstash/redis'
import { parseStory } from '@/delivery-api'
import { StoryContentView } from '@/app/[[...slugs]]/StoryContentView'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

type DynamicPageProps = {
  params: Promise<unknown>
  searchParams: Promise<unknown>
}

const parseParams = object<{ slugs: string[] }>({
  slugs: withDefault(array(parseString), []),
})

const getEnvironmentVariables = (): {
  baseUrl: string
  deliveryApiToken: string
} => {
  const parse = object({
    baseUrl: parseString,
    deliveryApiToken: parseString,
  })
  const result = parse({
    baseUrl: process.env.STORYBLOK_API_BASE_URL,
    deliveryApiToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  })

  if (result.error) {
    throw new Error(
      `Failed to fetch story: the backend is not configured with the required environment variables: ${formatResult(result)}`,
    )
  }

  return result.value
}

export default async function DynamicPage(props: DynamicPageProps) {
  const paramsResult = parseParams(await props.params)

  if (paramsResult.error) {
    console.error(
      `Failed to parse params: the folders in the app directory are likely misconfigured ${formatResult(paramsResult)}`,
    )
    throw new Error('Failed to parse params')
  }

  const bridgeSearchParams = parseBridgeSearchParams(
    await props.searchParams,
  ).value

  const { baseUrl, deliveryApiToken } = getEnvironmentVariables()

  const { story, rels } = await fetchStory({
    baseUrl,
    deliveryApiToken,
    slugs: paramsResult.value.slugs,
    bridgeSearchParams,
    resolveRelations: ['teamMembers.teamMembers'],
  }).catch((error: unknown) => {
    console.error('Error fetching story:', error)
    notFound()
  })

  const fromCache = withDefault(
    parseStory,
    undefined,
  )(await redis.get('story')).value

  const currentPath = '/' + paramsResult.value.slugs.join('/')

  /*
   * Live preview: if you want to use the live preview, use the following code.
   */
  return (
    <ClientContentView
      enablePreview={bridgeSearchParams.version === 'draft'}
      path={currentPath}
      onInput={updateStory}
    >
      <StoryContentView rels={rels} story={fromCache ?? story} />
    </ClientContentView>
  )
}
