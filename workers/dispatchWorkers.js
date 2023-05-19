const { fork } = require('child_process')
const path = require('path')

const workerFile = path.join(__dirname, 'imageValidationWorker.js')

console.log('Dispatching worker...')

// Start the worker as a separate child process
const worker = fork(workerFile)

// Listen for messages from the worker process
worker.on('message', (message) => {
  console.log('Received message from worker:', message)
})

// Handle any errors that occur in the worker process
worker.on('error', (error) => {
  console.error('Worker error:', error)
})

// Handle the worker process exit
worker.on('exit', (code) => {
  console.log(`Worker exited with code ${code}`)
})
