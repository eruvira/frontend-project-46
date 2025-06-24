import formatStylish from './stylish.js'

const format = (tree, formatName = 'stylish') => {
  if (formatName === 'stylish') return `{\n${formatStylish(tree)}\n}`
  throw new Error(`Unknown format: ${formatName}`)
}

export default format
