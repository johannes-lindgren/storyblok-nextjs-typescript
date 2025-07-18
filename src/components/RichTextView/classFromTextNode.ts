import type { Mark, StyledMark, TextNode } from '../../delivery-api'

export const classFromTextNode = (node: TextNode): string =>
  node.marks.map(classFromMark).join(' ')

const classFromMark = (mark: Mark): string => {
  switch (mark.type) {
    case 'italic':
      return 'italic'
    case 'bold':
      return 'font-bold'
    case 'strike':
      return 'line-through'
    case 'code':
      return 'font-mono bg-accent-light bg-opacity-12 text-accent-light text-sm px-1 rounded'
    case 'underline':
      return 'underline'
    case 'subscript':
      return 'align-sub'
    // requires custom Tailwind class or plugin
    case 'superscript':
      return 'align-super'
    // requires custom Tailwind class or plugin
    case 'textStyle':
      return ''
    // dynamic color, handle inline or via style attribute
    case 'highlight':
      return 'text-sm px-1 rounded'
    // background color dynamic, use inline style
    case 'link':
      return 'text-accent-light'
    case 'styled':
      return classFromStyledMark(mark as StyledMark)
    default:
      return ''
  }
}

const classFromStyledMark = (mark: StyledMark): string => {
  switch (mark.attrs.class) {
    case 'gradient':
      return 'bg-gradient-text bg-[400%] bg-left bg-clip-text text-transparent'
    default:
      return ''
  }
}
