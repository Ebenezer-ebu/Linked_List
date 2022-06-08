// It stores values in a list like arrays but doesn't make reference to values using indices.
// Linked list is a bunch of elements with no indices who points to the next element e.g like a train
// A linked list contains a head, tail, and length property
// Linked list consist of nodes, and each node has a value and a pointer to another node or null
// When it comes to insertion and deletion linked list is a better option, as the list dont have an issue like arrays that get re-indexed

// create a node
// Class Pascal case
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// let first = new Node("Hi");
// first.next = new Node("There");
// first.next.next = new Node("Love");
// console.log(first);

class SinglyLinkedList {
  constructor(val) {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // creates a new node add attach to the SinglyLinkedList
  // O(1)
  // Create a new node with value passed in
  // check if there is a head property, if not set the head and tail to the new node that was created
  // other wise set the next property on the tail to the new node and set the tail property on the list to the newly created node
  // increment length by one;
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      // OR --> this.tail = this.head
    } else {
      this.tail.next = newNode;
      this.tail = this.tail.next;
      // OR --> this.tail = newNode;
    }
    this.length++;
    return this;
  }
    
  // This removes the last item from the list
  // O(n)
  // If there is nothing in the list return undefined
  // Loop through the until u reach the tail and get 2nd to last item
  // Set the next property of 2nd to last node to be null
  // Set the tail to be the 2nd to last node
  // Decrement the length of the list by 1
  // Return the value of the node removed
  // If there is one item in the list
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let previous = current;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    this.tail = previous;
    this.tail.next = null;
    this.length--;
    // Edge case Ignore at first then explain
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current.val;
  }

  // removes the head and moves to next
  // 0(1)
  // if there are nodes, return undefined
  // Store current head property in a variable
  // Set the head property to be the current head's next property
  // Decrement the length by 1
  // Return the value of the node removed
  shift() {
    if (!this.head) return undefined;
    let current = this.head;
    this.head = current.next;
    this.length--;
    // Edge case Ignore at first then explain
    if (this.length === 0) {
      this.tail = null;
    }
    return current.val;
  }
    
  // Create a new node like push method using the value passed to the method
  // if no head, set the head and tail to newly created node
  // Otherwise set the newly created node's next property to be the current head property on the list
  // set the head property on the list to be that newly created node.
  // Increment of the list by 1
  // Return the linked list
  unShift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  // Retrieves a node by its position
  // O(n)
  // function should have an index
  // if index is less than zero or greater than or equal to the length of the list, return null or undefined
  // loop through the list until you reach the specific index
  get(indx) {
    if (indx < 0 || indx >= this.length) return undefined;
    let count = 0;
    let current = this.head;
    while (indx > count) {
      current = current.next;
      count++;
    }
    return current;
  }

  // This is to update the value of a node after Retrieving the index
  // O(n)
  // Use ur get function to find the specific node
  // If node not found return false
  // If node is found, set the value of that node to be the value passed to the function and return true;
  set(indx, value) {
    let node = this.get(indx);
    if (!node) return false;
    node.val = value;
    return true;
  }

  // This takes the index you passed in and insert the node at that index
  // O(n)
  // Create a new node
  // if the index is less than zero or greater than the length of then return false
  // If the index is same as the length, push a new node to the end of the list
  // If the index is 0, unShift a new node to the start of the list
  // other wise, using the get method, access the node at the index -1
  // set the next property on that node to be the new node
  // set the property on the new node to be the previous next
  // Increment the length
  // return true or false
  insert(indx, value) {
    if (indx < 0 || indx > this.length) return false;
    if (indx === this.length) {
      this.push(value);
      return true;
    }
    if (indx === 0) {
      this.unShift(value);
      return true;
    }

    const newNode = new Node(value);
    let prev = this.get(indx - 1);
    let next = prev.next;
    prev.next = newNode;
    newNode.next = next;
    this.length++;
    return true;
  }

  // This takes in an index and remove the node at that index
  // Define a function "remove" that takes an index
  // If the index is less than zero or greater than the length return undefined
  // If the index is the same as the length-1 , use a pop
  // if the index is 0, use a shift
  // Otherwise, use the get method, access the node at the index-1
  // set the next property on that node to be the next of the next node
  // Decrement the length
  // Return the value of the node removed
  remove(indx) {
    if (indx < 0 || indx > this.length) return false;
    if (indx === this.length - 1) return this.pop();
    if (indx === 0) return this.shift();

    let prev = this.get(indx - 1);
    let removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed.val;
  }
  // swap the head and tail
  // create  a variable called next
  // create  a variable called prev
  // create  a variable called node and initialize it to the head property
  // Loop through the list
  // set next to be the next property on whatever node is
  // set the next property on the node to be whatever prev is
  // set the prev ton be the value of the node variable
  // set the node variable to be the value of the next variable

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    while (node.next) {
      next = node.next;
      // new node next
      node.next = prev;
      // new previous
      prev = node;
      // new node
      node = next;
    }
  }
  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

let list = new SinglyLinkedList();
list.push("Hello");
list.push("there");
list.push("!!!");
list.pop();
list.push("Another");
list.shift();
list.unShift("First");
list.get(0);
list.set(6, "Ebuka");
list.insert(1, "Testing");
console.log(JSON.stringify(list));

console.log(list.remove(1));
list.reverse();

console.log(JSON.stringify(list));



