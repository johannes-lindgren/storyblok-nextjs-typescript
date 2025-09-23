import * as React from 'react'
import NextImage from 'next/image'
import type { ImageNode } from '../../delivery-api'
import { FunctionComponent } from 'react'

export type ImageNodeViewProps = {
  node: ImageNode
}

export const ImageNodeView: FunctionComponent<ImageNodeViewProps> = (props) => {
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
