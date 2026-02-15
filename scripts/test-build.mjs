import { execSync } from 'child_process'

try {
  const output = execSync('npx next build 2>&1', { 
    cwd: '/vercel/share/v0-project',
    maxBuffer: 1024 * 1024 * 10,
    timeout: 120000,
    encoding: 'utf-8'
  })
  console.log(output.slice(-3000))
} catch (e) {
  console.log("BUILD FAILED:")
  console.log(e.stdout?.slice(-3000) || '')
  console.log(e.stderr?.slice(-3000) || '')
}
