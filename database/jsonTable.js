const path  = require('path')
const fs = require('fs')


let model = function (tableName) {
    return{
        filePath: path.join(__dirname,'../database/'+ tableName+ '.json'),
        readFile(){
            let fileContents = fs.readFileSync(this.filePath,'utf-8');
            if (fileContents) {
                return JSON.parse(fileContents)
            }
            return[];
        },

        writeFile(contents){
            let fileContents = JSON.stringify(contents,null," ");
            fs.writeFileSync(this.filePath,fileContents);
        },
        netxId(){
            let rows = this.readFile();
            let lastRow= rows.pop();

            if(lastRow){
                return ++lastRow.id
            }
            return 1;
        },
        all(){
            return this.readFile()
        },
        create(row){
            let rows= this.readFile();
            row.id = this.netxId();
            rows.push(row);

            this.writeFile(rows);
            return row.id
        }

    }
}

module.exports = model;