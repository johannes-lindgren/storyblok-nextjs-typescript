import * as React from 'react'
import type { BulletListNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type BulletListNodeViewProps = {
  node: BulletListNode
}

function BulletListNodeView(props: BulletListNodeViewProps) {
  return (
    <ul className="list-disc mb-6 pl-5">
      {props.node.content?.map((node, index) => (
        <li
          className="mb-2"
          key={index}
        >
          <RichTextNodes nodes={node.content} />
        </li>
      ))}
    </ul>
  )
}

export default BulletListNodeView
