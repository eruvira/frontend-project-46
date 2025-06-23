import fs from 'fs'
import path from 'path'

const getFormat = (filepath) => path.extname(filepath).slice(1) 

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data)
  }
  throw new Error(`Unknown file format: ${format}`)
}

const parseFile = (filepath) => {
  const data = readFile(filepath)
  const format = getFormat(filepath)
  return parse(data, format)
}

export default parseFile
