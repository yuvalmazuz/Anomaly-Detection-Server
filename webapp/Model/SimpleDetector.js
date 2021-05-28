const CorrFeatures = require('./CorrelatedFeatures');
const shape = require('./Geo');
const anomalyDetect = require('./AnomalyDetectionUtil');

class SimpleDetector {
    cf = []
    threshold = 0.9
    anomalyDetection = new anomalyDetect()

    constructor() {
    }

    findThreshold(points, line_reg) {
        let max = 0
        for (let i = 0; i < points.length; i++) {
            let d = Math.abs(parseFloat(points[i].y) - line_reg.f(parseFloat(points[i].x)))
            // take the maximum
            if (d > max)
                max = d;
        }
        return max;
    }

    toPoints(val_x, val_y) {
        let ps_arr = []
        for (let i = 0; i < val_x.length; i++) {
            ps_arr.push(new shape.Point(parseFloat(val_x[i]), parseFloat(val_y[i])));
        }
        return ps_arr;
    }

    learnNormal(ts) {
        let attributes = ts.getAttributes()
        let vals = new Array(attributes.length)
        let numOfRows= ts.getNumOfValuesRows()
        for (let i = 0; i < attributes.length; i++){
            vals[i] = new Array(numOfRows);
        }
        for (let i = 0; i < attributes.length; i++){
            let x = ts.getAttributeData(attributes[i])
            for (let j = 0; j < numOfRows; j++){
                vals[i][j] = parseFloat(x[j]);
            }
        }
        for (let i = 0; i < attributes.length; i++){
            let f1 = attributes[i];
            let max = 0;
            let j_max = 0;
            for (let j = i+1; j < attributes.length; j++) {
                let p = Math.abs(parseFloat(this.anomalyDetection.pearson(vals[i], vals[j]).toString()))
                if (p > max) {
                    max = p;
                    j_max = j;
                }
            }
            let f2 = attributes[j_max];
            let ps = this.toPoints(ts.getAttributeData(f1),ts.getAttributeData(f2));
            this.learnHelper(max, f1, f2, ps);
        }
    }


    learnHelper(pearson, f1, f2, ps) {
        if (pearson > this.threshold) {
            let c = new CorrFeatures();
            c.f1 = f1;
            c.f2 = f2;
            c.correlation = parseFloat(pearson);
            c.lin_reg = this.anomalyDetection.linear_reg(ps);
            c.threshold = this.findThreshold(ps, c.lin_reg) * 1.1; // 10% increase
            this.cf.push(c);
        }
    }


    detect(ts) {
        let report = [];
        for (let i = 0; i < this.cf.length; i++) {
            // get the values from time series and cf
            let first_feature = this.cf[i].f1;
            let second_feature = this.cf[i].f2;
            let vector1 = Array.from(ts.getAttributeData(first_feature));
            let vector2 = Array.from(ts.getAttributeData(second_feature));
            for (let j = 0; j < vector1.length; j++) {
                // create point from the two feature
                if (this.isAnomalous(vector1[j], vector2[j], this.cf[i])) {
                    let timeStep = j + 1;
                    const data = {"feature1" : first_feature, "feature2" : second_feature, "time" : timeStep}
                    report.push(data);
                }
            }
        }
        return {report: report};
    }


    isAnomalous(x, y, cfs){
        return (Math.abs(parseFloat(y) - cfs.lin_reg.f(parseFloat(x))) > parseFloat(cfs.threshold));
    }

    // getter to the threshold field
    get_threshold(){
        return this.threshold;
    }
}

module.exports = SimpleDetector
module.exports.learnNormal = this.learnNormal
module.exports.detect = this.detect

