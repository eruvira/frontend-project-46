import _ from 'lodash'

const indent = (depth) => ' '.repeat(depth * 4 - 2)
const braceIndent = (depth) => ' '.repeat(depth * 4)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return String(value)

  const entries = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  )
  return `{\n${entries.join('\n')}\n${braceIndent(depth + 1)}}`
}

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent(depth)}${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${indent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent(depth, '+')}${node.key}: ${stringify(node.newValue, depth)}`
        ].join('\n')
      case 'nested':
        return `${indent(depth)}${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${braceIndent(depth + 1)}}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return lines.join('\n')
}

export default formatStylish
