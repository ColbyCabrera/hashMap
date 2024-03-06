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

    console.log(this.arr[13]);
  }
}

let test = new HashMap();
console.log(test.hash("Sara"));
console.log(test.hash("raSa"));
test.set("Sara", 5);
test.set("raSa", 5);