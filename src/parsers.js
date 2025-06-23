import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

const parseFile = (filepath) => {
  const data = readFile(filepath)
  const ext = path.extname(filepath).slice(1)
  return parse(data, ext)
}

export default parseFile
