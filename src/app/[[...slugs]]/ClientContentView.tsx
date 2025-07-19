'use client'
import { FunctionComponent, useEffect, useState } from 'react'
import { StoryContentView } from './StoryContentView'
import { parseStory, Story } from '@/delivery-api'
import { formatResult } from 'pure-parse'
import StoryblokBridge from '@storyblok/preview-bridge'

const usePreviewedStory = (enable: boolean) => {
  const [story, setStory] = useState<Story>()

  useEffect(() => {
    if (!enable) {
      return
    }

      const bridge = new StoryblokBridge()
      bridge.on('input', (payload) => {
        const result = parseStory(payload.story)
        if (result.error) {
          console.error(
            `Failed to parse response from the bridge: ${formatResult(result)}`,
          )
          setStory(undefined)
        } else {
          setStory(result.value)
        }
      })

    return () => {
      // The bridge does not support cleanup of side effects.
    }
  }, [enable])

  return story
}

/**
 * Render the content when it's
 * @param props Pass the server-rendered content in the `draft` prop;
 *  this is necessary in order to preview the content outside the iframe.
 * @constructor
 */
export const ClientContentView: FunctionComponent<{
  storyFromServer: Story
  rels: Story[]
  enablePreview: boolean
}> = (props) => {
  const { storyFromServer, rels, enablePreview } = props

  const storyFromEditor = usePreviewedStory(enablePreview)

  // When the user edits the story in the editor, storyFromEditor will be updated.
  return (
    <StoryContentView rels={rels} story={storyFromEditor ?? storyFromServer} />
  )
}
