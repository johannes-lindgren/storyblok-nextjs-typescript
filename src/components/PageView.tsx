import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import type { PageContent } from '../content'
import { AppBar } from './AppBar'
import { Footer } from './Footer'
import { ContentView } from './ContentView'
import { FunctionComponent } from 'react'

export type PageViewProps = {
  content: PageContent
}

export const PageView: FunctionComponent<PageViewProps> = (props) => {
  return (
    <div
      className="flex flex-col items-stretch"
      {...editableAttributes(props.content)}
    >
      <AppBar />
      {props.content.body?.map((content, index) => (
        <ContentView content={content} key={index} />
      ))}
      <Footer />
    </div>
  )
}
