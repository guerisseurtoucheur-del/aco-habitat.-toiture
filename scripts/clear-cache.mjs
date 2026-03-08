import { rmSync } from 'fs'
import { join } from 'path'

const projectRoot = join(import.meta.dirname, '..')

const dirsToDelete = ['.next', '.turbo']

for (const dir of dirsToDelete) {
  const fullPath = join(projectRoot, dir)
  try {
    rmSync(fullPath, { recursive: true, force: true })
    console.log(`Deleted: ${fullPath}`)
  } catch (e) {
    console.log(`Skipped (not found): ${fullPath}`)
  }
}

console.log('Cache cleared successfully!')
