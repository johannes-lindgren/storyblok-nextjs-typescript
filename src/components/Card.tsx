import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import NextImage from 'next/image'
import type { CardContent } from '../content'
import RichTextView from './RichTextView'

export type CardViewProps = {
  content: CardContent
  className?: string
}

function CardView(props: CardViewProps) {
  return (
    <div
      {...editableAttributes(props.content)}
      className={`flex flex-col justify-start items-start gap-4 bg-white rounded-[20px] p-4 sm:p-6 ${props.className}`}
    >
      {props.content.icon ? (
        <NextImage
          className="box-content p-2 w-10 h-10 sm:w-[34px] sm:h-[34px]"
          src={props.content.icon?.filename}
          alt={props.content.icon?.alt ?? ''}
          width={34}
          height={34}
        />
      ) : null}
      <RichTextView node={props.content.description} />
    </div>
  )
}

export default CardView
