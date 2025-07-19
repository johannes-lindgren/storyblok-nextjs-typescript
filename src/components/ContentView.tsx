import * as React from 'react'
import type { Content } from '../content'
import TeamMembersView from './TeamMembers'
import PageView from './PageView'
import TestimonialsView from './TestimonialsView'
import TestimonialView from './TestimonialView'
import CardsView from './Cards'
import HeroView from './Hero'
import TabsView from './TabsView'
import CardView from './Card'
import ButtonView from './Button'

export type ContentViewProps = {
  content: Content
}

function ContentView(props: ContentViewProps) {
  switch (props.content.component) {
    case 'page':
      return <PageView content={props.content} />
    case 'testimonials':
      return <TestimonialsView content={props.content} />
    case 'testimonial':
      return <TestimonialView content={props.content} />
    case 'cards':
      return <CardsView content={props.content} />
    case 'card':
      return <CardView content={props.content} />
    case 'hero':
      return <HeroView content={props.content} />
    case 'tabs':
      return <TabsView content={props.content} />
    case 'teamMembers':
      return <TeamMembersView content={props.content} />
    case 'button':
      return <ButtonView content={props.content} />
  }
}

export default ContentView
