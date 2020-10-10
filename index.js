addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

let linkData = [
  { "name": "Link1", "url": "https://linkurl" },
  { "name": "Link2", "url": "https://linkurl" },
  { "name": "Link3", "url": "https://linkurl" }
]

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname == '/links') {
    return new Response(JSON.stringify(linkData), {
      headers: { 'content-type': 'application/json' },
    })
  } else {
      return new Response('400 Bad Request', { status: 400 })
    }
}
