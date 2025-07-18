import { ClientContentView } from './ClientContentView'
import { fetchStory } from '@/delivery-api'
import { parseBridgeSearchParams } from '@/bridge'
import {
  array,
  formatResult,
  object,
  parseString,
  withDefault,
} from 'pure-parse'
import { notFound } from 'next/navigation'

type DynamicPageProps = {
  params: Promise<unknown>
  searchParams: Promise<unknown>
}

const parseParams = object<{ slugs: string[] }>({
  slugs: withDefault(array(parseString), []),
})

export default async function DynamicPage(props: DynamicPageProps) {
  const paramsResult = parseParams(await props.params)

  if (paramsResult.error) {
    console.error(
      `Failed to parse params: the folders in the app directort are likely misconfigured ${formatResult(paramsResult)}`,
    )
    throw new Error('Failed to parse params')
  }

  const bridgeSearchParams = parseBridgeSearchParams(
    await props.searchParams,
  ).value

  const baseUrl = process.env.STORYBLOK_API_BASE_URL
  const deliveryApiToken = process.env.STORYBLOK_DELIVERY_API_TOKEN

  if (!deliveryApiToken || !baseUrl) {
    throw new Error(
      'Failed to fetch story: the backend is not configured with the required environment variables',
    )
  }

  const { story, rels } = await fetchStory({
    baseUrl,
    deliveryApiToken,
    slugs: paramsResult.value.slugs,
    bridgeSearchParams,
    resolveRelations: ['teamMembers.teamMembers'],
  }).catch((error) => {
    console.error('Error fetching story:', error)
    notFound()
  })

  /*
   * Live preview: if you want to use the live preview, use the following code.
   */
  return (
    <ClientContentView
      rels={rels}
      storyFromServer={story}
      enablePreview={bridgeSearchParams.version === 'draft'}
    />
  )

  /*
   * RSC: if you want to render with RSC, use the following code.
   */
  // return <StoryContentView story={story} rels={rels} />
}
