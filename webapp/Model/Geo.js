
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    f(x){
        return this.a * x + this.b
    }
}

module.exports.Point = Point
module.exports.Line = Line