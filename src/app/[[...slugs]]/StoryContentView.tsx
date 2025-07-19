import { FunctionComponent } from 'react'
import { parseContent, resolveStories } from '@/content'
import { Story } from '@/delivery-api'
import { ContentView } from '@/components/ContentView'
import { formatResult } from 'pure-parse'

/**
 * Render the content in a story.
 * @param props
 * @constructor
 */
export const StoryContentView: FunctionComponent<{
  rels: Story[]
  story: Story
}> = (props) => {
  const { story, rels } = props
  const contentRes = parseContent(resolveStories(story, rels).content)

  if (contentRes.error) {
    console.error(
      `Failed to parse content: ${formatResult(contentRes)}`,
      JSON.stringify(story.content),
    )
    throw new Error(`Failed to parse content`)
  }

  return <ContentView content={contentRes.value} />
}
