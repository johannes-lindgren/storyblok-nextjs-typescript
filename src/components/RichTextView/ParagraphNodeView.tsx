import * as React from 'react'
import type { ParagraphNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type ParagraphNodeViewProps = {
  node: ParagraphNode
}

function ParagraphNodeView(props: ParagraphNodeViewProps) {
  return (
    <p className="text-base my-6">
      <RichTextNodes nodes={props.node.content} />
    </p>
  )
}

export default ParagraphNodeView
