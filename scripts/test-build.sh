#!/bin/bash
cd /vercel/share/v0-project
npx next build 2>&1 | tail -80
