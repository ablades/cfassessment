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

  return new Response(JSON.stringify(linkData), {
    headers: { 'content-type': 'application/json' },
  })
}
