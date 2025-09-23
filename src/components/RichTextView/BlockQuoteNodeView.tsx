import * as React from 'react'
import type { BlockQuoteNode } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { FunctionComponent } from 'react'

export type BlockQuoteNodeViewProps = {
  node: BlockQuoteNode
}

export const BlockQuoteNodeView: FunctionComponent<BlockQuoteNodeViewProps> = (
  props,
) => {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6 py-2">
      <RichTextNodes nodes={props.node.content} />
    </blockquote>
  )
}
