import * as React from 'react'

/*
 * NOTE: when expressing conditionals with JSX or directives, TypeScript cannot infer the types. This is why we assert the type, even though it's technically incorrect. * Signal-based frameworks like Solid.js and Mitosis are simply incompatible with TypeScript in conditionals. */ import type {
  CardsContent,
  Content,
  HeroContent,
  PageContent,
  TestimonialContent,
  TestimonialsContent,
  TabsContent,
  TeamMembersContent,
  CardContent,
  ButtonContent,
} from '../content'
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
  return (
    <>
      {props.content.component === 'page' ? (
        <PageView content={props.content as PageContent} />
      ) : null}{' '}
      {props.content.component === 'testimonials' ? (
        <TestimonialsView content={props.content as TestimonialsContent} />
      ) : null}{' '}
      {props.content.component === 'testimonial' ? (
        <TestimonialView content={props.content as TestimonialContent} />
      ) : null}{' '}
      {props.content.component === 'cards' ? (
        <CardsView content={props.content as CardsContent} />
      ) : null}{' '}
      {props.content.component === 'card' ? (
        <CardView content={props.content as CardContent} />
      ) : null}{' '}
      {props.content.component === 'hero' ? (
        <HeroView content={props.content as HeroContent} />
      ) : null}{' '}
      {props.content.component === 'tabs' ? (
        <TabsView content={props.content as TabsContent} />
      ) : null}{' '}
      {props.content.component === 'teamMembers' ? (
        <TeamMembersView content={props.content as TeamMembersContent} />
      ) : null}{' '}
      {props.content.component === 'button' ? (
        <ButtonView content={props.content as ButtonContent} />
      ) : null}
    </>
  )
}

export default ContentView
