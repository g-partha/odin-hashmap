import { LinkedList } from "./linked-list.js";

class LinkedListHS extends LinkedList {
  findIndexOfKeyHS(keyHS) {
    let currentNode = this.firstNode;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.value === keyHS) return currentIndex;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }
}
export class HashSet {
  loadFactor = 0.75;
  capacity = 16;
  bucketsList = [];
  hash(keyHS) {
    let hashCode = 0;
    const prime = 41;
    for (let i = 0; i < keyHS.length; i++) {
      hashCode = (hashCode * prime + keyHS.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  newEntry(keyHS) {
    const hashValue = this.hash(keyHS);
    if (!this.bucketsList[hashValue]) {
      this.bucketsList[hashValue] = new LinkedListHS();
    }
    if (this.bucketsList[hashValue].findIndexOfKeyHS(keyHS) !== null) {
      return;
    }
    this.bucketsList[hashValue].append(keyHS);
  }
  expand() {
    if ((this.length() + 1) / this.capacity > this.loadFactor) {
      this.capacity *= 2;
      const entries = this.keys();
      this.clear();
      for(let i = 0; i < entries.length; i++){
        this.newEntry(entries[i]);
      }
    }
  }
  set(keyHS) {
    this.expand();
    this.newEntry(keyHS);
  }
  has(keyHS) {
    const hashValue = this.hash(keyHS);
    if (!this.bucketsList[hashValue]) return false;
    const indexOfKeyHS = this.bucketsList[hashValue].findIndexOfKeyHS(keyHS);
    if (indexOfKeyHS !== null) return true;
    return false;
  }
  remove(keyHS) {
    const hashValue = this.hash(keyHS);
    if (!this.bucketsList[hashValue]) return false;
    const indexOfKeyHS = this.bucketsList[hashValue].findIndexOfKeyHS(keyHS);
    if (indexOfKeyHS !== null) {
      this.bucketsList[hashValue].removeAt(indexOfKeyHS);
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
    const keysArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.bucketsList[i]) {
        keysArray.push(...this.bucketsList[i].values());
      }
    }
    return keysArray;
  }
}
