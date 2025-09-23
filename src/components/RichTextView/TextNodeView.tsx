import * as React from 'react'
import type { LinkMark, TextNode } from '../../delivery-api'
import { LinkTextNodeView } from './LinkTextNodeView'
import { classFromTextNode } from './classFromTextNode'

export type TextNodeViewProps = {
  node: TextNode
}

const getLinkMark = (node: TextNode): LinkMark | undefined =>
  node.marks.find((mark) => mark.type === 'link')

export const TextNodeView: React.FunctionComponent<TextNodeViewProps> = (
  props,
) => {
  return (
    <>
      {getLinkMark(props.node) ? (
        <LinkTextNodeView
          node={props.node}
          linkAttrs={(getLinkMark(props.node) as LinkMark).attrs}
        />
      ) : null}
      {!getLinkMark(props.node) ? (
        <span className={classFromTextNode(props.node)}>{props.node.text}</span>
      ) : null}
    </>
  )
}
