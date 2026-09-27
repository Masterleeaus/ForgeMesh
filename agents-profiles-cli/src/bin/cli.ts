#!/usr/bin/env node

import { createCLI } from '../cli.js'

process.on('unhandledRejection', (err) => {
  console.error('Unhandled error:', err instanceof Error ? err.message : String(err))
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})

const program = createCLI()

program.parse(process.argv)
