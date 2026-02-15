import { execSync } from 'child_process';

try {
  const output = execSync('npx next build 2>&1', {
    cwd: '/vercel/share/v0-project',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 120000,
    encoding: 'utf-8',
  });
  console.log("BUILD OUTPUT:");
  console.log(output.slice(-5000));
} catch (e) {
  console.log("BUILD FAILED:");
  console.log(e.stdout?.slice(-5000) || "");
  console.log("STDERR:", e.stderr?.slice(-3000) || "");
}
