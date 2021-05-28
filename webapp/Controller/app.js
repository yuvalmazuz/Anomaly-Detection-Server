//imports modules
const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/filesProccess')

const app = express()
//define app uses
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload({}))
app.use(express.static('../View'))
//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

//Post Method for '/detect' url
app.post('/detect', (req, res) => {
    let regFile = req.files.regCsv.data.toString()
    let anamolyFile = req.files.anamCsv.data.toString()
    let error = model.checkError(req.files)
    if(error != ""){
        res.write(error)
    }
    else {
        let selectedAlgo = req.body.algoList
        let result = model.callAlgorithm(regFile, anamolyFile, selectedAlgo)
        res.contentType("application/json")
        for(let i=0; i<result.report.length; i++){
            let str = i + ". " + JSON.stringify((result.report)[i]) + "\n"
            res.write(str)
        }
    }
    res.end()
})

//starting server on port 8080
app.listen(8080, ()=>console.log("server started at 8080"))