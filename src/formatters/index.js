import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const format = (tree, formatName = 'stylish') => {
  if (formatName === 'stylish') return `{\n${formatStylish(tree)}\n}`
  if (formatName === 'plain') return formatPlain(tree)
  throw new Error(`Unknown format: ${formatName}`)
}

export default format
