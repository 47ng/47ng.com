import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createRequire } from 'node:module'
import { after, before, test } from 'node:test'

const require = createRequire(import.meta.url)
let server
let baseUrl
let output = ''

before(async () => {
  server = spawn(process.execPath, [
    require.resolve('next/dist/bin/next'),
    'start',
    '--hostname',
    '127.0.0.1',
    '--port',
    '0',
  ], { stdio: ['ignore', 'pipe', 'pipe'] })

  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.once('exit', code => reject(new Error(`Server exited with ${code}: ${output}`)))
    const onData = chunk => {
      output += chunk
      const address = output.match(/http:\/\/127\.0\.0\.1:\d+/)
      if (address && output.includes('Ready in')) {
        baseUrl = address[0]
        resolve()
      }
    }
    server.stdout.on('data', onData)
    server.stderr.on('data', onData)
  })
})

after(async () => {
  if (!server || server.exitCode !== null || server.signalCode !== null) return
  const exited = once(server, 'exit')
  server.kill('SIGTERM')
  const timer = setTimeout(() => server.kill('SIGKILL'), 5000)
  timer.unref()
  await exited
  clearTimeout(timer)
})

test('the home page redirects to GitHub', async () => {
  const response = await fetch(baseUrl, { redirect: 'manual' })
  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), 'https://github.com/47ng')
  await response.text()
})

test('the profile page shows the owner', async () => {
  const response = await fetch(`${baseUrl}/hi`)
  assert.equal(response.status, 200)
  assert.match(await response.text(), /François Best/)
})

test('the placeholder page still renders', async () => {
  const response = await fetch(`${baseUrl}/foo`)
  assert.equal(response.status, 200)
  assert.match(await response.text(), /Under construction/)
})
