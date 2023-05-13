const host = 'localhost'
const port = 8000

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded')
  const rootElement = document.querySelector('body > div#main')

  function require(path) {
    const client = new XMLHttpRequest()
    client.open("GET", normalizePath(path), false)
    client.send()

    if (client.status >= 400) {
      throw new Error(`Module loading "${path}" failed.`)
    }

    return eval(`
      (function (module, require) {
        ${client.response}
        
        return module.exports
      })({ exports: {}, rootElement }, require)
    `)
  }

  require('lib/index')
})

function normalizePath(path) {
  let normalized = `http://${host}:${port}/${path}`

  if (!path || typeof path !== 'string' || !path.length) {
    throw new Error(`Module path "${path}" is invalid.`)
  }

  if (!path.endsWith('.js')) {
    normalized += '.js'
  }

  return normalized
}
