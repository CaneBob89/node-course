const http=require("http")
const {readFileSync}=require("fs")
const homePage=readFileSync("./navbar-app/index.html","utf8")
const homeStyles=readFileSync("./navbar-app/styles.css","utf8")
const homeImage=readFileSync("./navbar-app/logo.svg","utf8")
const homeLogic=readFileSync("./navbar-app/browser-app.js","utf8")
const server=http.createServer((req,res)=>{
  const url=req.url;
  if(url==="/"){
    res.writeHead(200,{"content-type":"text/html"})
    res.write(homePage)
    res.end()
  }else if(url==="/styles.css"){
    res.writeHead(200,{"content-type":"text/css"})
    res.write(homeStyles)
    res.end()
  }else if(url==="/logo.svg"){
    res.writeHead(200,{"content-type":"image/svg+xml"})
    res.write(homeImage)
    res.end()
  }else if(url==="/browser-app.js"){
    res.writeHead(200,{"content-type":"text/javascript"})
    res.write(homeLogic)
    res.end()
  }else{
    res.writeHead(404,{"content-type":"text/html"})
    res.write("<h1>Resource not found</h1>")
    res.end()
  }

})
server.listen(5000)