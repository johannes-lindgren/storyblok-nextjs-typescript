import { map, object, oneOf, parseString, withDefault } from 'pure-parse'
import { type PreviewSearchParams } from '@storyblok/preview-bridge'

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

export const parseBridgeSearchParams = withDefault<BridgeSearchParams>(
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
