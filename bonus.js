//Bonus Part C Below:
let http = require(`http`)
let url = require(`url`)
const fs = require(`fs`);
const port = process.env.PORT || 3000;

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
                response.writeHead(404, res.writeHead(404, {'Content-Type': 'text/html'}));
                return response.end("Created and appended" + content +  "to " + this.fileName);
            }else{
                console.log(content + ' appended to file successfully.');
            }
            
        });
    }
}

http.createServer((req, res) => {
    let queryParam = url.parse(req.url, true)
    const filename = "file"
    if (req.url.includes("readFile")){
        let reader = new Reader(filename);
        reader.read_file_content(res);
        
    }else if(req.url.includes("writeFile")){
        let writer = new Writer(filename);
        const text = queryParam.query["text"]
        writer.write_file_content(text);
        res.end()
    }
}).listen(port)