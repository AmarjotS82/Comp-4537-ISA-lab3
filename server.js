let http = require(`http`)
let util = require('./modules/utils')
let url = require(`url`)

const port = process.env.PORT || 3000;

//got syntax from chatGPT didn't know how to export variables from one js file to another
const {welcome} =  require('./lang/en/en');
const {dateMsg} =  require('./lang/en/en');
const {closingParaTag} =  require('./lang/en/en');

http.createServer((req, res) => {
    let queryParam = url.parse(req.url, true)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(welcome + queryParam.query["name"] + dateMsg  + util.getDate() + closingParaTag)
}).listen(port)
