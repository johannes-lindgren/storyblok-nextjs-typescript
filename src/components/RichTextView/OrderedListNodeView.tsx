import * as React from 'react'
import type { OrderedListNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type OrderedListNodeViewProps = {
  node: OrderedListNode
}

function OrderedListNodeView(props: OrderedListNodeViewProps) {
  return (
    <ol className="list-decimal mb-6 pl-5">
      {props.node.content?.map((node, index) => (
        <li
          className="mb-2"
          key={index}
        >
          <RichTextNodes nodes={node.content} />
        </li>
      ))}
    </ol>
  )
}

export default OrderedListNodeView
