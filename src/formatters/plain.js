import _ from 'lodash'

const stringify = (value) => {
  if (_.isPlainObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const iter = (tree, parent = '') => {
  const lines = tree
    .filter(node => node.type !== 'unchanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key

      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.value)}`
        case 'removed':
          return `Property '${property}' was removed`
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        case 'nested':
          return iter(node.children, property)
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })

  return lines.flat().join('\n')
}

export default iter
