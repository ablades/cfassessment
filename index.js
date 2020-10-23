addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

let linkData = [
  { "name": "Link1", "url": "https://linkurl1" },
  { "name": "Link2", "url": "https://linkurl2" },
  { "name": "Link3", "url": "https://linkurl3" }
]

let socialData = [
  { "svgUrl": "https://simpleicons.org/icons/twitter.svg", url: "https://www.twitter.com" },
  { "svgUrl": "https://simpleicons.org/icons/facebook.svg", url: "https://www.facebook.com" }
]

class LinksTransformer {
  constructor(links, svg = false) {
    this.links = links
    this.svg = svg
  }

  // incoming divs
  async element(element) {
    // inject a tags
    this.links.forEach((link) => {
      if (this.svg == false) {
        element.append(`<a href="${link.url}">${link.name}</a>`, {html : true})
      } else {
          element.append(`
            <a href="${link.url}"> 
              <svg width="90" height="90">       
                <image xlink:href="${link.svgUrl}" src="${link.svgUrl}" width="90" height="90"/>    
              </svg> 
            </a>`,
            {html : true}
          )
      }
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
      
      // remove and add elements to rewriter
      rewriter.on("div#links", new LinksTransformer(linkData))
      rewriter.on("div#profile", {element: e => e.removeAttribute('style')})
      rewriter.on("div#social", {element: e => e.removeAttribute('style')})
      rewriter.on("div#social", new LinksTransformer(socialData, svg=true))
      rewriter.on("title", {element: e => e.setInnerContent("Audaris Blades")})
      rewriter.on("img#avatar", {element: e => e.setAttribute('src', 'https://avatars1.githubusercontent.com/u/6531016?s=60&v=4')})
      rewriter.on("h1#name", {element: e => e.append('ablades')})
      rewriter.on("body", {element: e => e.setAttribute("class", "bg-orange-400")})
      
      return rewriter.transform(page)
    }
}
