class Vector
{
    constructor(arr)
    {
        this.arr = arr;
    }

    add(other)
    {
        if (this.arr.length !== other.arr.length) 
        {
            throw new Error("Vectors must have the same length");
        }
        const result = this.arr.map((value, index) => value + other.arr[index]);
        return new Vector(result);
    }

    sub(other)
    {
        if (this.arr.length !== other.arr.length) 
        {
              throw new Error("Vectors must have the same length");
        }
        const result = this.arr.map((value, index) => value - other.arr[index]);
        return new Vector(result);
    } 
    dot(other) 
    {
        if (this.arr.length !== other.arr.length) 
        {
            throw new Error("Vectors must have the same length");
        }
        return this.arr.reduce((sum, value, index) => sum + value * other.arr[index], 0);
    }
}

let a=new Vector([1,2,3]);
let b=new Vector([4,5,6]);

console.log(a.add(b).sub(b).dot(b));
