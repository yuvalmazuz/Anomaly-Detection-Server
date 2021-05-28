
class TimeSeries {
    mapTS
    arrRowsLength

    constructor(file){
        let timeSeries = new Map()
        let arr_rows = file.split('\r\n')
        this.arrRowsLength = arr_rows.length - 1
        let attributes = arr_rows[0].split(',')
        for (let i = 0; i < attributes.length; i++){
            let list_value = []
            for(let j = 1; j <  this.arrRowsLength; j++){
                let split_row = arr_rows[j].split(',')
                list_value.push(split_row[i])
            }
            timeSeries.set(attributes[i],list_value)
        }
        this.mapTS = timeSeries;
    }

    // getters:
    getAttributeData(name) {
        return this.mapTS.get(name);
    }

    getAttributes() {
        return Array.from(this.mapTS.keys());
    }

    getNumOfValuesRows(){
        return this.arrRowsLength - 1;
    }
}

module.exports = TimeSeries
