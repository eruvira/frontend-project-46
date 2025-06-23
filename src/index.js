import _ from 'lodash'
import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  const lines = allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`
      ].join('\n')
    }
    return `    ${key}: ${data1[key]}`
  })

  return `{\n${lines.join('\n')}\n}`
}

export default genDiff
