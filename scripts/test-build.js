import { spawn } from 'child_process';

const proc = spawn('./node_modules/.bin/next', ['build'], {
  cwd: '/vercel/share/v0-project',
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'production' },
});

let out = '';
let err = '';

proc.stdout.on('data', (d) => { out += d.toString(); });
proc.stderr.on('data', (d) => { err += d.toString(); });

proc.on('close', (code) => {
  console.log("EXIT CODE:", code);
  console.log("--- STDOUT (last 8000 chars) ---");
  console.log(out.slice(-8000));
  console.log("--- STDERR (last 4000 chars) ---");
  console.log(err.slice(-4000));
});

setTimeout(() => {
  console.log("TIMEOUT - partial output:");
  console.log("STDOUT:", out.slice(-5000));
  console.log("STDERR:", err.slice(-3000));
  proc.kill();
}, 180000);
