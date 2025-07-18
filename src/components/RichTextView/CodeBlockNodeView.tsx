import * as React from 'react'
import type { CodeBlockNode } from '../../delivery-api'
import RichTextNodes from './RichTextNodes'

export type CodeBlockNodeViewProps = {
  node: CodeBlockNode
}

function CodeBlockNodeView(props: CodeBlockNodeViewProps) {
  return (
    <pre className="bg-gray-100 text-gray-800 text-sm rounded-md p-4 overflow-x-auto font-mono border border-gray-300">
      <code>
        <RichTextNodes nodes={props.node.content} />
      </code>
    </pre>
  )
}

export default CodeBlockNodeView
