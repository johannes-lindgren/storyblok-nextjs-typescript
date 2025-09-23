import * as React from 'react'
import type { HeadingNode } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { FunctionComponent } from 'react'

export type HeadingNodeViewProps = {
  node: HeadingNode
}

export const HeadingNodeView: FunctionComponent<HeadingNodeViewProps> = (
  props,
) => {
  switch (props.node.attrs.level) {
    case 1:
      return (
        <h1 className="text-6xl font-extrabold mt-12 mb-6">
          <RichTextNodes nodes={props.node.content} />
        </h1>
      )
    case 2:
      return (
        <h2 className="text-5xl font-extrabold mt-10 mb-5">
          <RichTextNodes nodes={props.node.content} />
        </h2>
      )
    case 3:
      return (
        <h3 className="text-4xl font-extrabold mt-8 mb-4">
          <RichTextNodes nodes={props.node.content} />
        </h3>
      )
    case 4:
      return (
        <h4 className="text-3xl font-extrabold mt-6 mb-3">
          <RichTextNodes nodes={props.node.content} />
        </h4>
      )
    case 5:
      return (
        <h5 className="text-2xl font-extrabold mt-5 mb-2">
          <RichTextNodes nodes={props.node.content} />
        </h5>
      )
    case 6:
      return (
        <h6 className="text-xl font-extrabold mt-4 mb-2">
          <RichTextNodes nodes={props.node.content} />
        </h6>
      )
  }
}
