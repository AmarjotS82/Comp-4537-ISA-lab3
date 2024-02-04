let http = require(`http`)
let util = require('./modules/utils')
let url = require(`url`)

const port = process.env.PORT || 3000;

//got syntax from chatGPT didn't know how to export variables from one js file to another
const {startingParaTag} =  require('./lang/en/en');
const {message} =  require('./lang/en/en');
const {closingParaTag} =  require('./lang/en/en');

http.createServer((req, res) => {
    let queryParam = url.parse(req.url, true)
    const name = queryParam.query["name"]
    const messageFilled = message.replace("%1", name)

    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(startingParaTag + messageFilled  + util.getDate() + closingParaTag)
}).listen(port)
