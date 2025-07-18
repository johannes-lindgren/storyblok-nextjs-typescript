import * as React from 'react'
import type { HeadingNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type HeadingNodeViewProps = {
  node: HeadingNode
}

function HeadingNodeView(props: HeadingNodeViewProps) {
  return (
    <>
      {props.node.attrs.level === 1 ? (
        <h1 className="text-6xl font-extrabold mt-12 mb-6">
          <RichTextNodes nodes={props.node.content} />
        </h1>
      ) : null}
      {props.node.attrs.level === 2 ? (
        <h2 className="text-5xl font-extrabold mt-10 mb-5">
          <RichTextNodes nodes={props.node.content} />
        </h2>
      ) : null}
      {props.node.attrs.level === 3 ? (
        <h3 className="text-4xl font-extrabold mt-8 mb-4">
          <RichTextNodes nodes={props.node.content} />
        </h3>
      ) : null}
      {props.node.attrs.level === 4 ? (
        <h4 className="text-3xl font-extrabold mt-6 mb-3">
          <RichTextNodes nodes={props.node.content} />
        </h4>
      ) : null}
      {props.node.attrs.level === 5 ? (
        <h5 className="text-2xl font-extrabold mt-5 mb-2">
          <RichTextNodes nodes={props.node.content} />
        </h5>
      ) : null}
      {props.node.attrs.level === 6 ? (
        <h6 className="text-xl font-extrabold mt-4 mb-2">
          <RichTextNodes nodes={props.node.content} />
        </h6>
      ) : null}
    </>
  )
}

export default HeadingNodeView
