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
    const indexOfHMKey = this.findIndexOfKeyHM(keyHM);
    if(indexOfHMKey !== null){
        this.at(indexOfHMKey).value.valueHM = valueHM;
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
    if(this.bucketsList[hashValue].findIndexOfKeyHM(keyHM) !== null){
        this.bucketsList[hashValue].replaceValueHM(valueHM, keyHM);
        return;
    }
    this.bucketsList[hashValue].append(new NodeHM(keyHM, valueHM));
  }
  get(keyHM) {}
  has(keyHM) {}
  remove(keyHM) {}
  length() {}
  clear() {}
  keys() {}
  values() {}
  entries() {}
}
