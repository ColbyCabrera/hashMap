class LinkedList {
  constructor() {
    this.listSize = 0;
    this.listHead = null;
    this.listTail = null;
  }

  append(data) {
    const node = new Node(data.key, data.value);
    if (this.listSize == 0) {
      this.listHead = node;
    } else {
      this.listTail.nextNode = node;
    }

    this.listTail = node;

    this.listSize++;
  }

  prepend(key, value) {
    const node = new Node(key, value);
    if (this.listSize == 0) {
      this.listTail = node;
    } else {
      node.nextNode = this.listHead;
    }
    this.listHead = node;
    this.listSize++;
  }

  insertAt(key, value, index) {
    if (index > this.listSize || index < 0) return "Out of list bounds";
    if (index == 0) {
      this.prepend(key, value);
      return;
    }

    let current = this.listHead;
    let nodeAtIndexPlus1;
    const node = new Node(key, value);

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

  find(key) {
    let current = this.listHead;

    for (let i = 0; i < this.listSize; i++) {
      if (current.key === key) return i;
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

    if (this.arr[bucket] != null || this.arr[bucket] != undefined) {
      if (this.arr[bucket] instanceof LinkedList) {
        let index = this.arr[bucket].find(key);
        if (index != null) {
          this.arr[bucket].at(index).value = value;
        } else {
          this.arr[bucket].append(node);
        }
      } else {
        if (this.arr[bucket].key == key) {
          this.arr[bucket] = node;
        } else {
          let list = new LinkedList();
          list.append(node);
          list.append(this.arr[bucket]);
          this.arr[bucket] = list;
        }
      }
    } else {
      this.arr[bucket] = node;
    }
  }

  get(key) {
    let bucket = this.hash(key) % this.arr.length;
    if (this.arr[bucket] instanceof LinkedList) {
      let index = this.arr[bucket].find(key);
      if (index != null) {
        return this.arr[bucket].at(index);
      } else {
        return null;
      }
    }
    return this.arr[bucket] ? this.arr[bucket] : null;
  }

  has(key) {
    let bucket = this.hash(key) % this.arr.length;
    if (this.arr[bucket] instanceof LinkedList) {
      let index = this.arr[bucket].find(key);
      return (index != null) ? true : false;
    }
    
    return this.arr[bucket].key == key ? true : false;
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
test.set("Sara", 6);
test.set("raSa", 5);
test.set("woo", 80);
console.log(test.has("Sara"));
console.log(test.has("owo"));


