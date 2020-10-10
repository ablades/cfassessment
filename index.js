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

  // incoming divs
  async element(element) {
    console.log(element.tagName)
    // inject a tags
    this.links.forEach((link, index, arr) => {
      element.append(`<a href="${link.url}">${link.name}</a>`, {html : true})
    })
  }
}

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname == '/links') {
    return new Response(JSON.stringify(linkData), {
      headers: { 'content-type': 'application/json' },
    })
  } else {
      let page = await fetch('https://static-links-page.signalnerve.workers.dev')
      const rewriter = new HTMLRewriter()
      
      rewriter.on("div#links", new LinksTransformer(linkData))
      rewriter.on("div#profile", {element: e => e.removeAttribute('style')})
      rewriter.on("img#avatar", {element: e => e.setAttribute('src', 'https://avatars1.githubusercontent.com/u/6531016?s=60&v=4')})
      rewriter.on("h1#name", {element: e => e.append('ablades')})
      
      return rewriter.transform(page)
    }
}
