import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

test('gendiff flat JSON files', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFixture('expected.txt')

  expect(genDiff(file1, file2, 'stylish')).toBe(expected)
})

test('gendiff flat YAML files', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFixture('expected.txt')

  expect(genDiff(file1, file2, 'stylish')).toBe(expected)
})

test('gendiff plain format', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')
  const expected = readFixture('expected_plain.txt')
  expect(result).toBe(expected)
})

test('gendiff json format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const result = genDiff(file1, file2, 'json')
  const parsed = JSON.parse(result)

  expect(parsed).toBeInstanceOf(Array) 
  expect(parsed[0]).toHaveProperty('type')
  expect(parsed[0]).toHaveProperty('key')
})
