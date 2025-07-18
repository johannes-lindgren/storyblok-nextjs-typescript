import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import NextImage from 'next/image'
import type { TeamMemberContent } from '../content'
import { backgroundColor } from './backgroundColorClass'

type TeamMemberViewProps = {
  content: TeamMemberContent
}

function TeamMemberView(props: TeamMemberViewProps) {
  return (
    <div
      className="w-96 inline-flex flex-col justify-start items-start gap-6"
      {...editableAttributes(props.content)}
    >
      <div
        className={`self-stretch relative rounded-xl inline-flex justify-start items-center gap-2.5 overflow-hidden ${backgroundColor(
          props.content.backgroundColor,
        )}`}
      >
        {props.content.image ? (
          <NextImage
            className="translate-y-[50px] w-96 h-96 rounded-md object-contain"
            src={props.content.image?.filename}
            alt={props.content.image?.alt ?? ''}
            width={368}
            height={384}
          />
        ) : null}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start">
        <div className="justify-start text-stone-900 text-2xl font-extrabold leading-loose">
          {props.content.name}
        </div>
        <div className="self-stretch justify-start text-stone-900 text-base font-normal leading-7">
          {props.content.title}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberView
