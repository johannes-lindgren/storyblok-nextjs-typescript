import * as React from 'react'
import type { RichTextContent } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { TextNodeView } from './TextNodeView'
import { HeadingNodeView } from './HeadingNodeView'
import { BulletListNodeView } from './BulletListNodeView'
import { OrderedListNodeView } from './OrderedListNodeView'
import { CodeBlockNodeView } from './CodeBlockNodeView'
import { BlockQuoteNodeView } from './BlockQuoteNodeView'
import { ImageNodeView } from './ImageNodeView'
import { ParagraphNodeView } from './ParagraphNodeView'
import { BlockNodeView } from './BlockNodeView'
import { FunctionComponent } from 'react'

export type RichTextProps = {
  node: RichTextContent
}

export const RichTextView: FunctionComponent<RichTextProps> = (props) => {
  switch (props.node.type) {
    case 'doc':
      return <RichTextNodes nodes={props.node.content} />
    case 'paragraph':
      return <ParagraphNodeView node={props.node} />
    case 'text':
      return <TextNodeView node={props.node} />
    case 'heading':
      return <HeadingNodeView node={props.node} />
    case 'bullet_list':
      return <BulletListNodeView node={props.node} />
    case 'ordered_list':
      return <OrderedListNodeView node={props.node} />
    case 'code_block':
      return <CodeBlockNodeView node={props.node} />
    case 'horizontal_rule':
      return <hr className="border-t border-gray-300 my-4" />
    case 'blockquote':
      return <BlockQuoteNodeView node={props.node} />
    case 'image':
      return <ImageNodeView node={props.node} />
    case 'blok':
      return <BlockNodeView node={props.node} />
  }
}
