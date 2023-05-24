export default class Router {

  routes = {}

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    this.handle()
  }
  
  handle(){
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
  
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector("#contents").innerHTML = html
    })

    const body = document.body
    const linkHome = document.querySelector(".link-home")
    const linkUniverse = document.querySelector(".link-universe")
    const linkExploration = document.querySelector(".link-exploration")

    switch (this.routes[pathname]){
      case "/pages/home.html":
        body.classList.remove("universe")
        body.classList.remove("exploration")
        linkHome.classList.add("selected")
        linkUniverse.classList.remove("selected")
        linkExploration.classList.remove("selected")
      break
      case "/pages/universe.html":
        body.classList.add("universe")
        body.classList.remove("exploration")
        linkHome.classList.remove("selected")
        linkUniverse.classList.add("selected")
        linkExploration.classList.remove("selected")
      break
      case "/pages/exploration.html":
        body.classList.remove("universe")
        body.classList.add("exploration")
        linkHome.classList.remove("selected")
        linkUniverse.classList.remove("selected")
        linkExploration.classList.add("selected")
      break
    }
  }

}