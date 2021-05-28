const hybridDetect = require('./HybridDetector')
const simpleDetect = require('./SimpleDetector')
const TimeSeries = require('./TimeSeries')

function getExtension(filename) {
    let parts = filename.toString().split('.');
    return parts[parts.length - 1];
}

// function that by time call to the correct algorithm
function callAlgorithm(regFile, anFile, type){
    if(type === 'linear') {
        let simple = new simpleDetect()
        let ts1 = new TimeSeries(regFile)
        simple.learnNormal(ts1)
        ts1 = new TimeSeries(anFile)
        return simple.detect(ts1)

    }
    else {
        let hybrid = new hybridDetect()
        let ts1 = new TimeSeries(regFile)
        hybrid.learnNormal(ts1)
        ts1 = new TimeSeries(anFile)
        return hybrid.detect(ts1)
    }
}

// function that check if the file type is csv
function checkType(filename){
    let ext = getExtension(filename);
    return ext.toLowerCase() === 'csv';

}

// function that check if there have errors
function checkError(files){
    let regCsvCheck = checkType(files.regCsv.name)
    let anaCsvCheck = checkType(files.anamCsv.name)
    if(!regCsvCheck && !anaCsvCheck){
        return "Invalid type of regular flight file and anomalous flight file:\n Only CSV files are valid"
    }
    else if(!regCsvCheck){
        return "Invalid type of regular flight file:\n Only CSV files are valid"
    }
    else if(!anaCsvCheck){
        return "Invalid type of anomalous flight file:\n Only CSV files are valid"
    }
    else{
        return ""
    }
}

//export file to module
module.exports.checkError = checkError
module.exports.callAlgorithm = callAlgorithm
