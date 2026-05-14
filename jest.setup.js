// Polyfill globals required by some dependencies (e.g. @noble/hashes via
// supertest/formidable/cuid2; koa's request body parsing) when running under
// jsdom.
if (globalThis.TextEncoder === undefined) {
  const { TextEncoder, TextDecoder } = require('node:util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}
if (globalThis.ReadableStream === undefined) {
  const {
    ReadableStream,
    WritableStream,
    TransformStream,
  } = require('node:stream/web');
  globalThis.ReadableStream = ReadableStream;
  globalThis.WritableStream = WritableStream;
  globalThis.TransformStream = TransformStream;
}
if (globalThis.MessagePort === undefined) {
  const { MessagePort, MessageChannel } = require('node:worker_threads');
  globalThis.MessagePort = MessagePort;
  globalThis.MessageChannel = MessageChannel;
}

// Note: `npm test` runs jest with --forceExit. React's scheduler
// (scheduler.development.js) creates a module-level MessageChannel
// at import time and never disposes it; setting .onmessage on the
// receiving port re-refs it even after .unref(), so jest's process
// will not exit cleanly on its own. This is a React-side limitation,
// not a leak in our tests.
