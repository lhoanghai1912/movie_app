const isDev = __DEV__

export const logger = {
  log: (...args: unknown[]) => isDev && console.log('[LOG]', ...args),
  warn: (...args: unknown[]) => isDev && console.warn('[WARN]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
}
