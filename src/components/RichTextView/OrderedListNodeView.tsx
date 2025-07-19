import * as React from 'react'
import type { OrderedListNode } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { FunctionComponent } from 'react'

export type OrderedListNodeViewProps = {
  node: OrderedListNode
}

export const OrderedListNodeView: FunctionComponent<
  OrderedListNodeViewProps
> = (props) => {
  return (
    <ol className="list-decimal mb-6 pl-5">
      {props.node.content?.map((node, index) => (
        <li className="mb-2" key={index}>
          <RichTextNodes nodes={node.content} />
        </li>
      ))}
    </ol>
  )
}
