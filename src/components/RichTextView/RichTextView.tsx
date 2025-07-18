import * as React from 'react'
import type {
  BlockNode,
  BlockQuoteNode,
  BulletListNode,
  CodeBlockNode,
  DocNode,
  HeadingNode,
  ImageNode,
  OrderedListNode,
  ParagraphNode,
  RichTextContent,
  TextNode,
} from '../../delivery-api'
import RichTextNodes from './RichTextNodes'
import TextNodeView from './TextNodeView'
import HeadingNodeView from './HeadingNodeView'
import BulletListNodeView from './BulletListNodeView'
import OrderedListNodeView from './OrderedListNodeView'
import CodeBlockNodeView from './CodeBlockNodeView'
import BlockQuoteNodeView from './BlockQuoteNodeView'
import ImageNodeView from './ImageNodeView'
import ParagraphNodeView from './ParagraphNodeView'
import BlockNodeView from './BlockNodeView'

export type RichTextProps = {
  node: RichTextContent
}

function RichTextView(props: RichTextProps) {
  return (
    <>
      {props.node.type === 'doc' ? (
        <div className="display-block">
          <RichTextNodes nodes={(props.node as DocNode).content} />
        </div>
      ) : null}
      {props.node.type === 'paragraph' ? (
        <ParagraphNodeView node={props.node as ParagraphNode} />
      ) : null}
      {props.node.type === 'text' ? (
        <TextNodeView node={props.node as TextNode} />
      ) : null}
      {props.node.type === 'heading' ? (
        <HeadingNodeView node={props.node as HeadingNode} />
      ) : null}
      {props.node.type === 'bullet_list' ? (
        <BulletListNodeView node={props.node as BulletListNode} />
      ) : null}
      {props.node.type === 'ordered_list' ? (
        <OrderedListNodeView node={props.node as OrderedListNode} />
      ) : null}
      {props.node.type === 'code_block' ? (
        <CodeBlockNodeView node={props.node as CodeBlockNode} />
      ) : null}
      {props.node.type === 'horizontal_rule' ? (
        <hr className="border-t border-gray-300 my-4" />
      ) : null}
      {props.node.type === 'blockquote' ? (
        <BlockQuoteNodeView node={props.node as BlockQuoteNode} />
      ) : null}
      {props.node.type === 'image' ? (
        <ImageNodeView node={props.node as ImageNode} />
      ) : null}
      {props.node.type === 'blok' ? (
        <BlockNodeView node={props.node as BlockNode} />
      ) : null}
    </>
  )
}

export default RichTextView
