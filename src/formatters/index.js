import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const format = (tree, formatName) => {
  if (formatName === 'stylish') return `{\n${formatStylish(tree)}\n}`
  if (formatName === 'plain') return formatPlain(tree)
  if (formatName === 'json') return formatJson(tree)
  throw new Error(`Unknown format: ${formatName}`)
}

export default format
