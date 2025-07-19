'use client'
import { FunctionComponent, useEffect } from 'react'
import { parseStory, Story } from '@/delivery-api'
import { formatResult } from 'pure-parse'
import StoryblokBridge from '@storyblok/preview-bridge'

const usePreviewedStory = (
  enable: boolean,
  onInput: (story: Story) => void,
) => {
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
      } else {
        onInput(result.value)
      }
    })

    return () => {
      // The bridge does not support cleanup of side effects.
    }
  }, [enable])
}

/**
 * Render the content when it's
 * @param props Pass the server-rendered content in the `draft` prop;
 *  this is necessary in order to preview the content outside the iframe.
 * @constructor
 */
export const ClientContentView: FunctionComponent<{
  enablePreview: boolean
  path: string
  onInput: (action: { story: Story; path: string }) => void
  children?: React.ReactNode
}> = (props) => {
  const { children, enablePreview, path, onInput } = props

  const handleInput = (story: Story) => {
    onInput({ story, path })
  }
  usePreviewedStory(enablePreview, handleInput)

  return children
}
