import * as React from 'react'
import Link from 'next/link'
import type { LinkAttrs, TextNode } from '../../delivery-api'
import { classFromTextNode } from './classFromTextNode'

export type TextNodeViewProps = {
  node: TextNode
  linkAttrs: LinkAttrs
}

/**
 * Converts a story link slug to a URL path for this application.
 * `/pages/mypage` -> `/mypage`
 * @param slugs
 */
const hrefFromStoryLink = (slugs: string): string =>
  '/' + slugs.split('/').slice(2).join('/')

const classFromLinkTextNode = (node: TextNode): string =>
  `text-blue-600 hover:text-blue-800 underline ${classFromTextNode(node)}`

function TextNodeView(props: TextNodeViewProps) {
  return (
    <>
      {props.linkAttrs.linktype === 'url' ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={props.linkAttrs.href}
          className={classFromLinkTextNode(props.node)}
        >
          {props.node.text}
        </Link>
      ) : null}
      {props.linkAttrs.linktype === 'story' ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={hrefFromStoryLink(props.linkAttrs.href)}
          className={classFromLinkTextNode(props.node)}
        >
          {props.node.text}
        </Link>
      ) : null}
      {props.linkAttrs.linktype === 'email' ? (
        <Link
          href={`mailto:${props.linkAttrs.href}`}
          className={classFromLinkTextNode(props.node)}
        >
          {props.node.text}
        </Link>
      ) : null}
      {props.linkAttrs.linktype === 'asset' ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={props.linkAttrs.href}
          className={classFromLinkTextNode(props.node)}
        >
          {props.node.text}
        </Link>
      ) : null}
    </>
  )
}

export default TextNodeView
