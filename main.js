import { HashMap } from "./hashmap.js";
import { HashSet } from "./hashset.js";
const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("apple");

test.set("hat");

test.set("moon");

console.log(test);
console.log(test.has('kite'));
console.log(test.has('notavailable'));
console.log(test.remove('hat'));


console.log(test.keys());