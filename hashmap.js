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

  newEntry(keyHM, valueHM) {
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
  expand() {
    if ((this.length() + 1) / this.capacity > this.loadFactor) {
      this.capacity *= 2;
      const entries = this.entries();
      this.clear();
      for(let i = 0; i < entries.length; i++){
        this.newEntry(entries[i].keyHM, entries[i].valueHM);
      }
    }
  }
  set(keyHM, valueHM) {
    this.expand();
    this.newEntry(keyHM, valueHM);
  }
  get(keyHM) {
    const hashValue = this.hash(keyHM);
    if (!this.bucketsList[hashValue]) return null;
    const indexOfKeyHM = this.bucketsList[hashValue].findIndexOfKeyHM(keyHM);
    if (indexOfKeyHM !== null) {
      return this.bucketsList[hashValue].at(indexOfKeyHM).value.valueHM;
    }
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
    this.bucketsList.length = 0;
  }
  keys() {
    const nodesArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        nodesArray.push(...this.bucketsList[i].values());
      }
    }
    return nodesArray.map((item) => {
      return item.keyHM;
    });
  }
  values() {
    const nodesArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        nodesArray.push(...this.bucketsList[i].values());
      }
    }
    return nodesArray.map((item) => {
      return item.valueHM;
    });
  }
  entries() {
    const nodesArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        nodesArray.push(...this.bucketsList[i].values());
      }
    }
    return nodesArray;
  }
}
