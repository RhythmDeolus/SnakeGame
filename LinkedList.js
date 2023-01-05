class Node{
	constructor(data){
		this.data = data;
		this.next = null;
	}
}
class LinkedList {
	constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
	add(data){
		var node = new Node(data);
		if(this.head == null){
			this.head = node;
			this.tail = node;
		}
		else {
			this.tail.next = node;
			this.tail = node;
		}
		this.size++;
	}
	removeHead(){
		let current = this.head;
		this.head = current.next;
		this.size--;
	}
}