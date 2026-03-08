import { rmSync, existsSync } from 'fs'
import { join } from 'path'

const root = join(import.meta.dirname, '..')
const dirs = ['.next', '.turbo', 'node_modules/.cache']

for (const dir of dirs) {
  const fullPath = join(root, dir)
  if (existsSync(fullPath)) {
    rmSync(fullPath, { recursive: true, force: true })
    console.log(`Deleted: ${dir}`)
  } else {
    console.log(`Not found: ${dir}`)
  }
}
console.log('Cache cleared!')
