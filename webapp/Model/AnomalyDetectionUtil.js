const shape = require("./Geo");

class AnomalyDetectionUtil {

    constructor() {
    }
    // calculate the average of the array=x
    avg(x) {
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += parseFloat(x[i])
        }
        return sum / x.length;
    }

    // returns the variance of X and Y
    Var(x) {
        let av = this.avg(x);
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += parseFloat(x[i]) * parseFloat(x[i]);
        }
        return sum / x.length - av * av;
    }

    // returns the covariance of X and Y
    cov(x, y) {
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += parseFloat(x[i]) * parseFloat(y[i]);
        }
        sum /= x.length;
        return sum - this.avg(x) * this.avg(y);
    }

    // returns the Pearson correlation coefficient of X and Y
    pearson(arr1, arr2) {
        /*console.log("cov: " +  parseFloat(this.cov(arr1, arr2)) + "\n")
        console.log("var1: " +  parseFloat(this.var(arr1)) + "\n")
        console.log("var2: " +  parseFloat(this.var(arr2)) + "\n")*/
        let p = parseFloat(this.cov(arr1, arr2)) /
            (Math.sqrt(parseFloat(this.Var(arr1))) * Math.sqrt(parseFloat(this.Var(arr2))));
        if(isNaN(p)) {
            return 0;
        } else if(p === Infinity) {
            return 1;
        } else {
            return p;
        }
    }

    // performs a linear regression and returns the line equation
    linear_reg(points) {
        let size = points.length
        let x = new Array(size);
        let y = new Array(size);
        for (let i = 0; i < points.length; i++) {
            x[i] = parseFloat(points[i].x);
            y[i] = parseFloat(points[i].y);
        }
        let a = this.cov(x, y) / this.Var(x);
        let b = this.avg(y) - a * (this.avg(x));

        return new shape.Line(a, b);
    }

    // returns the deviation between point p and the line equation of the points
    dev1(p, points) {
        let l = this.linear_reg(points);
        return this.dev2(p, l);
    }


    // returns the deviation between point p and the line
    dev2(point, line) {
        let x = parseFloat(point.y) - parseFloat(line.f(point.x));
        if (x < 0)
            x *= -1;
        return x;
    }
}

module.exports = AnomalyDetectionUtil