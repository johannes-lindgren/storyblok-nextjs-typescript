import * as React from 'react'
import { array, withDefault } from 'pure-parse'
import type { BlockNode } from '../../delivery-api'
import { ContentView } from '../ContentView'
import { parseContent } from '../../content'
import { FunctionComponent } from 'react'

export type BlockNodeViewProps = {
  node: BlockNode
}

const parseBody = withDefault(array(parseContent), [])

export const BlockNodeView: FunctionComponent<BlockNodeViewProps> = (props) => {
  return (
    <div>
      {parseBody(props.node.attrs.body).value?.map((content, index) => (
        <ContentView key={index} content={content} />
      ))}
    </div>
  )
}
