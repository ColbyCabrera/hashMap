/*
if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bound");
}

*/
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.arr = new Array(16);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let bucket = this.hash(key) % this.arr.length;
    let node = new Node(key, value);

    this.arr[bucket] = node;
  }

  get(key) {
    let bucket = this.hash(key) % this.arr.length;
    return this.arr[bucket] ? this.arr[bucket] : null;
  }

  has(key) {
    let bucket = this.hash(key) % this.arr.length;
    return this.arr[bucket] ? true : false;
  }

  remove(key) {
    let bucket = this.hash(key) % this.arr.length;
    this.arr[bucket] = null;
    return this.arr[bucket] ? true : false;
  }

  length() {
    let length = 0;
    this.arr.forEach(element => {
      if (element != null) {
        length++;
      }

    });

    return length;
  }

  clear() {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i] = null;
    }
  }
}

let test = new HashMap();
test.set("Sara", 5);
test.hash("zy", 5);
console.log(test.has("Sara"));
test.set("asara", 5);
test.set("Sar46sda", 5);
test.set("jttara", 5);
console.log(test.length());
test.clear();

console.log(test.length());



