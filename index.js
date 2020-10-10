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

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  //incoming divs
  async element(element) {
    console.log(element)
    this.links.forEach((link, index, arr) => {
      element.append(`<a href="${link.url}">${link.name}</a>`, {html : true})
    })
  }
}

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname == '/links') {
    return new Response(JSON.stringify(linkData), {
      headers: { 'content-type': 'application/json' },}
    )} else {

      const page = await fetch('https://static-links-page.signalnerve.workers.dev')

      return new HTMLRewriter().on("div#links", new LinksTransformer(linkData)).transform(page)
    }
}
