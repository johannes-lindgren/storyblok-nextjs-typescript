import * as React from 'react'
import NextImage from 'next/image'
import type { ImageNode } from '../../delivery-api'

export type ImageNodeViewProps = {
  node: ImageNode
}

function ImageNodeView(props: ImageNodeViewProps) {
  return (
    <NextImage
      className="overflow-hidden rounded-xl my-4"
      src={props.node.attrs.src}
      alt={props.node.attrs.alt}
      title={props.node.attrs.title}
      width={500}
      height={500}
    />
  )
}

export default ImageNodeView
