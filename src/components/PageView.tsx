import * as React from 'react'
import { editableAttributes } from '@storyblok/preview-bridge'
import type { PageContent } from '../content'
import AppBarView from './AppBar'
import FooterView from './Footer'
import ContentView from './ContentView'

export type PageViewProps = {
  content: PageContent
}

function PageView(props: PageViewProps) {
  return (
    <div
      className="flex flex-col items-stretch"
      {...editableAttributes(props.content)}
    >
      <AppBarView />
      {props.content.body?.map((content, index) => (
        <ContentView
          content={content}
          key={index}
        />
      ))}
      <FooterView />
    </div>
  )
}

export default PageView
