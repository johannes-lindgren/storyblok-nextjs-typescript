import * as React from 'react'
import type { BlockQuoteNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type BlockQuoteNodeViewProps = {
  node: BlockQuoteNode
}

function BlockQuoteNodeView(props: BlockQuoteNodeViewProps) {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6 py-2">
      <RichTextNodes nodes={props.node.content} />
    </blockquote>
  )
}

export default BlockQuoteNodeView
