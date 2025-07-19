import { ClientContentView } from './ClientContentView'
import { fetchStory } from '@/delivery-api'
import {
  array,
  formatResult,
  map,
  object,
  oneOf,
  parseString,
  withDefault,
} from 'pure-parse'
import { notFound } from 'next/navigation'
import type { PreviewSearchParams } from '@storyblok/preview-bridge'

/**
 * Description of the search params that Storyblok includes when
 * - Viewing inside the iframe in the Visual Editor
 * - Opening the "Open Draft" or "Open Published" buttons
 */
export type BridgeSearchParams =
  | ({
      version: 'draft'
    } & PreviewSearchParams)
  | {
      version: 'published'
      // Used to override the path from the URL.
      // For example, for `/pages/about?_storyblok_published=12345`,
      // one should fetch based on the id `12345` and not the path `/pages/about`.
      _storyblok_published?: string
    }

const parsePublishedSearchParams = object({
  _storyblok_published: parseString,
})

const parsePreviewSearchParams = object<PreviewSearchParams>({
  _storyblok: parseString,
  _storyblok_c: parseString,
  _storyblok_lang: parseString,
  _storyblok_release: parseString,
  _storyblok_rl: parseString,
  '_storyblok_tk[space_id]': parseString,
  '_storyblok_tk[timestamp]': parseString,
  '_storyblok_tk[token]': parseString,
  _storyblok_version: parseString,
})

const parseBridgeSearchParams = withDefault<BridgeSearchParams>(
  oneOf(
    // Turn this into a discriminated union by adding a `tag` discriminator.
    map(parsePreviewSearchParams, (value) => ({
      version: 'draft' as const,
      ...value,
    })),
    map(parsePublishedSearchParams, (value) => ({
      version: 'published' as const,
      ...value,
    })),
  ),
  {
    version: 'published' as const,
  },
)

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
      `Failed to parse params: the folders in the app directory are likely misconfigured ${formatResult(paramsResult)}`,
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
