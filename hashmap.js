import { LinkedList } from "./linked-list.js";

class LinkedListHM extends LinkedList {
  findIndexOfKeyHM(keyHM) {
    let currentNode = this.firstNode;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.value.keyHM === keyHM) return currentIndex;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }
  replaceValueHM(valueHM, keyHM) {
    const indexOfKeyHM = this.findIndexOfKeyHM(keyHM);
    if (indexOfKeyHM !== null) {
      this.at(indexOfKeyHM).value.valueHM = valueHM;
    }
  }
}
class NodeHM {
  constructor(keyHM, valueHM) {
    this.keyHM = keyHM;
    this.valueHM = valueHM;
  }
}
export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  bucketsList = [];
  hash(keyHM) {
    let hashCode = 0;
    const prime = 41;
    for (let i = 0; i < keyHM.length; i++) {
      hashCode = (hashCode * prime + keyHM.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }
  set(keyHM, valueHM) {
    const hashValue = this.hash(keyHM);
    if (!this.bucketsList[hashValue]) {
      this.bucketsList[hashValue] = new LinkedListHM();
    }
    if (this.bucketsList[hashValue].findIndexOfKeyHM(keyHM) !== null) {
      this.bucketsList[hashValue].replaceValueHM(valueHM, keyHM);
      return;
    }
    this.bucketsList[hashValue].append(new NodeHM(keyHM, valueHM));
  }
  get(keyHM) {
    const hashValue = this.hash(keyHM);
    if (!this.bucketsList[hashValue]) return null;
    const indexOfKeyHM = this.bucketsList[hashValue].findIndexOfKeyHM(keyHM);
    if (indexOfKeyHM !== null)
      return this.bucketsList[hashValue].at(indexOfKeyHM).value.valueHM;
    return null;
  }
  has(keyHM) {
    const hashValue = this.hash(keyHM);
    if (!this.bucketsList[hashValue]) return false;
    const indexOfKeyHM = this.bucketsList[hashValue].findIndexOfKeyHM(keyHM);
    if (indexOfKeyHM !== null) return true;
    return false;
  }
  remove(keyHM) {
    const hashValue = this.hash(keyHM);
    if (!this.bucketsList[hashValue]) return false;
    const indexOfKeyHM = this.bucketsList[hashValue].findIndexOfKeyHM(keyHM);
    if (indexOfKeyHM !== null) {
      this.bucketsList[hashValue].removeAt(indexOfKeyHM);
      return true;
    }
    return false;
  }
  length() {
    let totalNodes = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        totalNodes += this.bucketsList[i].size;
      }
    }
    return totalNodes;
  }
  clear() {
    this.bucketsList = [];
  }
  keys() {
    const keysArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        keysArray.push(...this.bucketsList[i].values());
      }
    }
    return keysArray.map((item) => {
      return item.keyHM;
    });
  }
  values() {
    const keysArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        keysArray.push(...this.bucketsList[i].values());
      }
    }
    return keysArray.map((item) => {
      return item.valueHM;
    });
  }
  entries() {
    const keysArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        keysArray.push(...this.bucketsList[i].values());
      }
    }
    return keysArray;
  }
}
