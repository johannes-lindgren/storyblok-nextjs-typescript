import * as React from 'react'
import type { CodeBlockNode } from '../../delivery-api'
import { RichTextNodes } from './RichTextNodes'
import { FunctionComponent } from 'react'

export type CodeBlockNodeViewProps = {
  node: CodeBlockNode
}

export const CodeBlockNodeView: FunctionComponent<CodeBlockNodeViewProps> = (
  props,
) => {
  return (
    <pre className="bg-gray-100 text-gray-800 text-sm rounded-md p-4 overflow-x-auto font-mono border border-gray-300">
      <code>
        <RichTextNodes nodes={props.node.content} />
      </code>
    </pre>
  )
}
