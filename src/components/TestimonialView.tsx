import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import NextImage from 'next/image'
import type { TestimonialContent } from '../content'
import { backgroundColor } from './backgroundColorClass'
import { FunctionComponent } from 'react'

export type TestimonialViewProps = {
  content: TestimonialContent
}
export const TestimonialView: FunctionComponent<TestimonialViewProps> = (
  props,
) => {
  return (
    <div
      className="flex flex-col items-start gap-6 p-12 flex-1 rounded-[12px] bg-white"
      {...editableAttributes(props.content)}
    >
      <p className="self-stretch justify-start text-stone-900 text-base font-normal leading-normal">
        “{props.content.quote}”
      </p>
      <div className="self-stretch flex gap-5">
        {props.content.image ? (
          <div
            className={`aspect-[1/1] shrink-0 w-[44px] h-[44px] overflow-hidden rounded-full ${backgroundColor(
              props.content.imageBackgroundColor,
            )}`}
          >
            <NextImage
              className="object-cover w-full h-full "
              src={props.content.image?.filename}
              alt={props.content.image?.alt ?? ''}
              width={100}
              height={100}
            />
          </div>
        ) : null}
        <div className="flex flex-col">
          <div className="justify-start text-stone-900 text-base font-bold font-['Inter']">
            {props.content.name}
          </div>
          <div className="justify-start text-stone-900 text-base font-normal leading-normal">
            {props.content.title}
          </div>
        </div>
      </div>
    </div>
  )
}
