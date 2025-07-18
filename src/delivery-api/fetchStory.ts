import { array, object, withDefault } from 'pure-parse'
import { type BridgeSearchParams } from '../bridge'
import { parseStory, type Story } from './Story'

export type StoryResponse = {
  story: Story
  rels: Story[]
}

export const parseStoryResponse = object<StoryResponse>({
  story: parseStory,
  rels: withDefault(array(parseStory), []),
})
type FetchStoryParams = {
  baseUrl: string
  deliveryApiToken: string
  slugs: string[]
  bridgeSearchParams: BridgeSearchParams
  resolveRelations?: string[]
}

export const fetchStory = async (
  params: FetchStoryParams,
): Promise<StoryResponse> => {
  const {
    baseUrl,
    deliveryApiToken,
    bridgeSearchParams,
    resolveRelations = [],
  } = params

  // When the page is previewed in Storyblok, Storyblok passes the entire slug of
  //  the story which for pages includes `pages` from the "pages" folder.
  //  But in production, we need to prepend `pages` to the slug given in the URL.
  const language =
    bridgeSearchParams.version === 'draft'
      ? bridgeSearchParams._storyblok_lang
      : 'default'

  const query = new URLSearchParams({
    token: deliveryApiToken,
    version: bridgeSearchParams.version,
    resolve_relations: resolveRelations.join(','),
    language: language,
  }).toString()

  // When the page is opened in the editor, or after clicking the "Open Draft/Published" button, use the id of the story.
  // Otherwise, use the path in the URL, prepended with `pages` (where all pages are stored).
  const slugOrId =
    bridgeSearchParams.version === 'draft'
      ? bridgeSearchParams._storyblok
      : (bridgeSearchParams._storyblok_published ??
        ['pages', ...params.slugs].join('/'))

  const url = `${baseUrl}/v2/cdn/stories/${slugOrId}?${query}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 404) {
    throw new Error('Not found')
  }
  if (!response.ok) {
    throw new Error('Failed to fetch story')
  }

  const json = await response.json()

  const result = parseStoryResponse(json)
  if (result.error) {
    throw new Error('Failed to fetch story: the response could not be parsed')
  }
  return result.value
}
