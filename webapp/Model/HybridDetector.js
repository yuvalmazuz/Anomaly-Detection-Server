const SimpleDetector = require('./SimpleDetector')
const enclosingCircle = require('smallest-enclosing-circle')
const CorrFeatures = require('./CorrelatedFeatures')
const shape = require('./Geo')

class HybridDetector extends SimpleDetector{

    constructor() {
        super();
    }
    // calculate distance between 2 points
    distance(p1, p2){
        let a = (p1.x - p2.x) * (p1.x - p2.x);
        let b = (p1.y - p2.y) * (p1.y - p2.y);
        return Math.sqrt(a + b);
    }
    // override
    learnHelper(pearson, f1, f2, ps){
        super.learnHelper(pearson, f1, f2, ps);
        let thresh = super.get_threshold();
        if(pearson > 0.5 && pearson < thresh){
            let c = new CorrFeatures()
            let circle = enclosingCircle(ps);
            c.threshold = circle.r * 1.1; // 10% increase
            c.f1 = f1;
            c.f2 = f2;
            c.correlation = pearson;
            c.cx = circle.x;
            c.cy = circle.y;
            this.cf.push(c)
        }
    }
    // override
    isAnomalous(x, y, c){
        let thresh = super.get_threshold()
        let firstCond = (c.correlation >= thresh) && (super.isAnomalous(x,y,c))
        let dist = this.distance(new shape.Point(x, y), new shape.Point(c.cx, c.cy))
        let thresh_c = c.threshold
        let secondCond = (c.correlation > 0.5) && (c.correlation < thresh) && (dist > thresh_c)
        return (firstCond || secondCond);
    }
}

module.exports = HybridDetector
module.exports.learnNormal = this.learnNormal
module.exports.detect = this.detect