import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import Link from 'next/link'
import type { ButtonContent } from '../content'
import type {
  AssetLinkContent,
  EmailLinkContent,
  StoryLinkContent,
  UrlLinkContent,
} from '../delivery-api'

export type ButtonViewProps = {
  content: ButtonContent
}

const classFromContent = (content: ButtonContent): string =>
  `self-center px-6 py-3 rounded-lg inline-flex flex-col items-end gap-3 overflow-hidden text-right justify-center text-sm font-semibold leading-tight transition-border duration-300 ease-in-out ${colorStyles(
    content,
  )}`

const colorStyles = (content: ButtonContent): string => {
  switch (content.color) {
    case 'primary':
      return 'bg-stone-900 hover:bg-stone-800 text-white hover:border-stone-800'
    case 'secondary':
      return 'bg-white color-stone-900 hover:bg-stone-100 hover:border-stone-900'
  }
}

/**
 * Converts a story link slug to a URL path for this application.
 * `/pages/mypage` -> `/mypage`
 * @param slugs
 */
const hrefFromStoryLink = (slugs: string): string =>
  '/' + slugs.split('/').slice(1).join('/')

function ButtonView(props: ButtonViewProps) {
  return (
    <>
      {props.content.link?.linktype === 'url' ? (
        <Link
          rel="noopener noreferrer"
          {...editableAttributes(props.content)}
          href={(props.content.link as UrlLinkContent)?.cached_url}
          target={props.content.link?.target}
          className={classFromContent(props.content)}
        >
          {props.content.text}
        </Link>
      ) : null}
      {props.content.link?.linktype === 'story' ? (
        <Link
          rel="noopener noreferrer"
          {...editableAttributes(props.content)}
          href={hrefFromStoryLink(
            (props.content.link as StoryLinkContent)?.cached_url,
          )}
          target={props.content.link?.target}
          className={classFromContent(props.content)}
        >
          {props.content.text}
        </Link>
      ) : null}
      {props.content.link?.linktype === 'email' ? (
        <Link
          {...editableAttributes(props.content)}
          href={`mailto:${(props.content.link as EmailLinkContent)?.email}`}
          className={classFromContent(props.content)}
        >
          {props.content.text}
        </Link>
      ) : null}
      {props.content.link?.linktype === 'asset' ? (
        <Link
          rel="noopener noreferrer"
          {...editableAttributes(props.content)}
          href={(props.content.link as AssetLinkContent)?.cached_url}
          className={classFromContent(props.content)}
        >
          {props.content.text}
        </Link>
      ) : null}
    </>
  )
}

export default ButtonView
