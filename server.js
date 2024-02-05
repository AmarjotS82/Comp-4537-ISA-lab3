let http = require(`http`)
let util = require('./modules/utils')
let url = require(`url`)

const port = process.env.PORT || 3000;

//got syntax from chatGPT didn't know how to export variables from one js file to another
const {startingParaTag} =  require('./lang/en/en');
const {message} =  require('./lang/en/en');
const {closingParaTag} =  require('./lang/en/en');

// http.createServer((req, res) => {
//     let queryParam = url.parse(req.url, true)
//     const name = queryParam.query["name"]
//     const messageFilled = message.replace("%1", name)

//     res.writeHead(200, {"Content-Type": "text/html"})
//     res.end(startingParaTag + messageFilled  + util.getDate() + closingParaTag)
// }).listen(port)


const fs = require(`fs`);


class Reader{
    constructor(filename){
        this.fileName = filename
    }

    read_file_content(response){
        fs.readFile(this.fileName + ".txt", (err, data) =>{
            if (err){
                console.log('Error reading file:', err);
                response.writeHead(404, {'Content-Type': 'text/html'});
                return response.end("404 " + this.fileName +".txt " +  " not found!");
            }else{
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                return response.end();
            }   
                
        })
    }
}

class Writer{
    constructor(filename){
        this.fileName = filename
    }

    write_file_content(content){
        //ChatGPT if there is a method to append to a file
        fs.appendFile(this.fileName + ".txt", content + "\n", (err) => {
            if (err) {
                console.log('creating File');
                fs.writeFile(this.fileName + ".txt", content + "\n", (err) => {
                    if (err) {
                        console.error('Error creating file:', err);
                    } else {
                        console.log('File created and content appended successfully.');
                    }
                });
            }else{
                console.log(content + ' appended to file successfully.');
            }
            
        });
    }
}

http.createServer((req, res) => {
    let queryParam = url.parse(req.url, true)
    const filename = ".file"
    //Bonus Part C Below:
    if (req.url.includes("readFile")){
        let reader = new Reader(filename);
        reader.read_file_content(res);
    //Bonus Part C Below: 
    }else if(req.url.includes("writeFile")){
        let writer = new Writer(filename);
        const text = queryParam.query["text"]
        writer.write_file_content(text);
        res.end()
    }else{
        //Part B after creating a server listening on specified port gets the url and takes the name information and outputs it to the client in a message

        const name = queryParam.query["name"]
        const messageFilled = message.replace("%1", name)

        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(startingParaTag + messageFilled  + util.getDate() + closingParaTag)
    }
}).listen(port)