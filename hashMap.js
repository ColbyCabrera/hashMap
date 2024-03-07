class LinkedList {
  constructor() {
    this.listSize = 0;
    this.listHead = null;
    this.listTail = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.listSize == 0) {
      this.listHead = node;
    } else {
      this.listTail.nextNode = node;
    }

    this.listTail = node;

    this.listSize++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.listSize == 0) {
      this.listTail = node;
    } else {
      node.nextNode = this.listHead;
    }
    this.listHead = node;
    this.listSize++;
  }

  insertAt(value, index) {
    if (index > this.listSize || index < 0) return "Out of list bounds";
    if (index == 0) {
      this.prepend(value);
      return;
    }

    let current = this.listHead;
    let nodeAtIndexPlus1;
    const node = new Node(value);

    for (let i = 0; i < index - 1; i++) {
      current = current.nextNode;
    }

    nodeAtIndexPlus1 = current.nextNode;
    current.nextNode = node;
    node.nextNode = nodeAtIndexPlus1;
    this.listSize++;
  }

  removeAt(index) {
    if (index > this.listSize - 1 || index < 0) return "Out of list bounds";
    if (index == 0) {
      this.listHead = this.listHead.nextNode;
      this.listSize--;
      return;
    }

    let current = this.listHead;
    let nodeAtIndexPlus1;

    for (let i = 0; i < index - 1; i++) {
      current = current.nextNode;
    }

    nodeAtIndexPlus1 = current.nextNode.nextNode;
    current.nextNode = nodeAtIndexPlus1;
    this.listSize--;
  }

  size() {
    return this.listSize;
  }

  head() {
    return this.listHead;
  }

  tail() {
    return this.listTail;
  }

  at(index) {
    if (index > this.listSize - 1 || index < 0) return "Out of list bounds";

    let current = this.listHead;

    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }

    return current;
  }

  pop() {
    let current = this.listHead;
    const oldTail = this.listTail;

    if (this.listSize > 1) {
      for (let i = 0; i < this.listSize - 2; i++) {
        current = current.nextNode;
      }
      this.listTail = current;
      this.listTail.nextNode = null;
    } else {
      this.listHead = null;
      this.listTail = null;
    }

    this.listSize--;
    return oldTail;
  }

  contains(value) {
    let current = this.listHead;

    for (let i = 0; i < this.listSize; i++) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }

  find(value) {
    let current = this.listHead;

    for (let i = 0; i < this.listSize; i++) {
      if (current.value === value) return i;
      current = current.nextNode;
    }

    return null;
  }

  toString() {
    let string = "";

    if (this.head() != null) {
      let current = this.head();

      do {
        string += `(${current.value}) -> `;
        current = current.nextNode;
      } while (current != null);
    }

    return (string += "null");
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
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

    if (this.overloaded()) {
      let extension = new Array(32);
      extension.push(...this.arr);
      this.arr = extension;

    }

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
    this.arr.forEach((element) => {
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

  keys() {
    let newArr = [];
    this.arr.forEach((element) => {
      if (element != null) {
        newArr.push(element.key);
      }
    });

    return newArr;
  }

  values() {
    let newArr = [];
    this.arr.forEach((element) => {
      if (element != null) {
        newArr.push(element.value);
      }
    });

    return newArr;
  }

  entries() {
    let newArr = [];
    this.arr.forEach((element) => {
      if (element != null) {
        newArr.push([element.key, element.value]);
      }
    });

    return newArr;
  }

  overloaded() {
    const currentLoad = this.length() / this.arr.length;
    return currentLoad > this.loadFactor;
  }
}

let test = new HashMap();
test.set("Sara", 5);
test.set("zy", 6);
test.set("asara", 87);
test.set("Sar46sda", 2);
test.set("jfsdfsdf", 1);
test.set("asarffsdsd43", 87);
test.set("Sa", 2);
test.set("jttaraWSERW", 1);
test.set("asarssssssss6", 87);
test.set("Sssssssss6r46sdssssssss6", 2);
test.set("ssssssss6sssssssss6rffsdsd43", 87);
test.set("Sssssssss6", 2);
test.set("jttssssssss6raWSERW", 1);
test.set("1", 1)
test.set("2", 1)
test.set("4", 1)
test.set("5", 1)


console.log(test.keys());
console.log(test.values());
console.log(test.entries());