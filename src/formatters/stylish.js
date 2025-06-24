import _ from 'lodash'

const getIndent = (depth, symbol = ' ') => `${' '.repeat(depth * 4 - 2)}${symbol} `
const getBracketIndent = depth => ' '.repeat(depth * 4)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const entries = Object.entries(value).map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`)

  return `{\n${entries.join('\n')}\n${getBracketIndent(depth)}}`
}

const formatStylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node

    switch (type) {
      case 'added':
        return `${getIndent(depth, '+')}${key}: ${stringify(value, depth)}`
      case 'removed':
        return `${getIndent(depth, '-')}${key}: ${stringify(value, depth)}`
      case 'unchanged':
        return `${getIndent(depth, ' ')}${key}: ${stringify(value, depth)}`
      case 'changed':
        return [
          `${getIndent(depth, '-')}${key}: ${stringify(oldValue, depth)}`,
          `${getIndent(depth, '+')}${key}: ${stringify(newValue, depth)}`,
        ]
      case 'nested':
        return `${getIndent(depth, ' ')}${key}: {\n${formatStylish(children, depth + 1)}\n${getBracketIndent(depth)}}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default formatStylish
