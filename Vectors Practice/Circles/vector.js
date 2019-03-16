class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        let newX = this.x + other.x
        let newY = this.y + other.y
        return new Vector(newX, newY);
    }

    scale(amount) {
        let newX = this.x * amount
        let newY = this.y * amount
        return new Vector(newX, newY);
    }
}
