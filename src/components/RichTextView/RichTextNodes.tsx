import * as React from 'react'
import type { RichTextContent } from '../../delivery-api'
import { RichTextView } from './RichTextView'

export type RichTextNodesProps = {
  nodes: RichTextContent[]
}

export const RichTextNodes: React.FunctionComponent<RichTextNodesProps> = (
  props,
) => {
  return (
    <>
      {props.nodes?.map((node, index) => (
        <RichTextView node={node} key={index} />
      ))}
    </>
  )
}
