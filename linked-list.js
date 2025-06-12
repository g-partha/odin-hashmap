export class LinkedList {
  firstNode = null;
  append(value) {
    if (this.firstNode === null) {
      this.firstNode = new Node(value, null);
      return;
    }
    let currentNode = this.firstNode;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = new Node(value, null);
  }
  prepend(value) {
    if (this.firstNode === null) {
      this.firstNode = new Node(value, null);
      return;
    }
    const secondNode = this.firstNode;
    this.firstNode = new Node(value, secondNode);
  }
  get size() {
    let totalNodes = 0;
    let currentNode = this.firstNode;
    while (currentNode) {
      totalNodes++;
      currentNode = currentNode.nextNode;
    }
    return totalNodes;
  }
  get head() {
    return this.firstNode;
  }
  get tail() {
    let currentNode = this.firstNode;
    while (currentNode) {
      if (currentNode.nextNode === null) return currentNode;
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }
  at(index) {
    if (index < 0) return null;
    let currentNode = this.firstNode;
    let currentIndex = 0;
    while (currentNode) {
      if (index === currentIndex) return currentNode;
      currentIndex++;
      currentNode = currentNode.nextNode;
    }
    return null;
  }
  pop() {
    if (this.firstNode === null || this.firstNode.nextNode === null) {
      this.firstNode = null;
      return;
    }
    let currentNode = this.firstNode;
    while (currentNode.nextNode) {
      if (currentNode.nextNode.nextNode === null) {
        currentNode.nextNode = null;
        return;
      }
      currentNode = currentNode.nextNode;
    }
  }
  contains(value) {
    let currentNode = this.firstNode;
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  values() {
    let valuesArray = [];
    if (this.firstNode === null) return "null";
    let currentNode = this.firstNode;
    while (currentNode) {
      valuesArray.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
    return valuesArray;
  }
  toString() {
    let string = "";
    if (this.firstNode === null) return "null";
    let currentNode = this.firstNode;
    while (currentNode) {
      string += `(${currentNode.value}) -> `;
      currentNode = currentNode.nextNode;
    }
    return string + "null";
  }
  insertAt(value, index) {
    if (this.firstNode === null) {
      if (index === 0) {
        this.append(value);
        return true;
      }
      return false;
    }
    if (index < 0 || index > this.size) return false;
    if (index === 0) {
      this.prepend(value);
      return true;
    }
    if (index === this.size) {
      this.append(value);
      return true;
    }

    let atIndex = this.at(index);
    let atIndexMinusOne = this.at(index - 1);
    atIndexMinusOne.nextNode = new Node(value, atIndex);
    return true;
  }
  removeAt(index) {
    if (index < 0 || index >= this.size) return false;
    if (index === 0) {
      this.firstNode = this.firstNode.nextNode;
      return true;
    }
    let atIndexMinusOne = this.at(index - 1);
    let atIndexPlusOne = this.at(index + 1);
    atIndexMinusOne.nextNode = atIndexPlusOne;
    return true;
  }
}
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
