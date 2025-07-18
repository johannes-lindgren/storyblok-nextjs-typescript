import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import type { TeamMembersContent } from '../content'
import TeamMemberView from './TeamMember'
import RichTextView from './RichTextView'

export type TeamMembersViewProps = {
  content: TeamMembersContent
}

function TeamMembersView(props: TeamMembersViewProps) {
  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 items-center flex flex-col"
      {...editableAttributes(props.content)}
    >
      <div className="max-w-6xl flex flex-col gap-10">
        <RichTextView node={props.content.description} />
        <div className="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
          {props.content.teamMembers?.map((member) => (
            <TeamMemberView
              key={member.content._uid}
              content={member.content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamMembersView
