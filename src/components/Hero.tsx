import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import NextImage from 'next/image'
import type { HeroContent } from '../content'
import { RichTextView } from './RichTextView'
import { backgroundColor } from './backgroundColorClass'
import { ButtonView } from './Button'
import { FunctionComponent } from 'react'

export type HeroViewProps = {
  content: HeroContent
}

const rootAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'flex flex-col md:flex-col'
  }
  switch (content.textAlignment) {
    case 'left':
      return 'flex flex-col md:flex-row'
    case 'right':
      return 'flex flex-col md:flex-row-reverse'
    case 'center':
      return 'flex flex-col md:flex-col'
  }
}

const textAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'items-center'
  }
  switch (content.textAlignment) {
    case 'left':
    case 'right':
      return 'items-start'
    case 'center':
      return 'items-center'
  }
}

export const HeroView: FunctionComponent<HeroViewProps> = (props) => {
  return (
    <div
      {...editableAttributes(props.content)}
      className={`self-stretch ${backgroundColor(
        props.content.backgroundColor,
      )} flex justify-center`}
    >
      <div
        className={`w-full ${
          props.content.imagePadding ? 'p-4 md:p-10' : 'p-0'
        } ${rootAlignment(props.content)} flex-wrap justify-between max-w-7xl`}
      >
        <div
          className={`
          flex-1 p-6 md:p-12 lg:px-20 lg:py-25 inline-flex flex-col justify-center
          ${textAlignment(props.content)}
        `}
        >
          <RichTextView node={props.content.description} />
          <div className="flex gap-2 md:gap-4 flex-wrap items-center">
            {props.content.buttons?.map((button) => (
              <ButtonView key={button._uid} content={button} />
            ))}
          </div>
        </div>
        {props.content.image ? (
          <div
            className={`relative flex-1 overflow-hidden md:min-h-[650px] ${
              props.content.imagePadding
                ? 'rounded-xl max-h-[60vw] min-h-[40vw] md:max-h-[800px]'
                : 'rounded-none max-h-[100%] min-h-[40vw] md:min-h-[100%]'
            } `}
          >
            <NextImage
              src={props.content.image?.filename}
              alt={props.content.image?.alt ?? ''}
              width={1200}
              height={650}
              className={`absolute h-full w-full object-cover`}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
