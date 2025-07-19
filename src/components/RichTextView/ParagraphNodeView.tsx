import * as React from 'react'
import type { ParagraphNode } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { FunctionComponent } from 'react'

export type ParagraphNodeViewProps = {
  node: ParagraphNode
}

export const ParagraphNodeView: FunctionComponent<ParagraphNodeViewProps> = (
  props,
) => {
  return (
    <p className="text-base my-6">
      <RichTextNodes nodes={props.node.content} />
    </p>
  )
}
