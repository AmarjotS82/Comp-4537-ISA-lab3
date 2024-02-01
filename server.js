let http = require(`http`)
let util = require('./modules/utils')
let en = require('./lang/en/en.js');
let url = require(`url`)

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    let queryParam = url.parse(req.url, true)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<p style='color:blue'> Hello " + queryParam.query["name"] + " " + util.date() + "</p>")
}).listen(port)
