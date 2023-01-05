canvas = document.getElementById("canvas");
canvasCtx = canvas.getContext("2d");
screen = document.getElementById("screen");
debugger;
let dimension = 51;
let margin = canvas.width/(6*dimension + 1);
let blockSize = (canvas.width/(6*dimension + 1))*5;
let snake = new LinkedList();
snake.add([25,50]);
snake.add([25,49]);
snake.add([25,48]);
snake.add([25,47]);
debugger;
let score = 0;
screen.innerHTML = "Score : " + score + "<br>" + "Size" + (score + 3);
let time = 200;
let dir = [0 ,-1];
let fruit = [25, 25];
let oppDir = "ArrowDown";
let clicked = false;
function draw(list){
	let current = list.head;
	canvasCtx.fillStyle = "white";
	while(current != null){
		canvasCtx.fillRect((current.data[0] + 1)*margin + current.data[0]*blockSize,
		(current.data[1] + 1)*margin + current.data[1]*blockSize, blockSize, blockSize);
		current = current.next;
	}
}
function drawFruit(){
	canvasCtx.fillStyle = "red";
	canvasCtx.fillRect((fruit[0] + 1)*margin + fruit[0]*blockSize,
		(fruit[1] + 1)*margin + fruit[1]*blockSize, blockSize, blockSize);
}
function copy(arr){
	let temp = [];
	for(let item of arr){
		temp.push(item);
	}
	return temp;
}
function clear(){
	canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
};
function gameOver(){
	clear();
	canvasCtx.font = "80px Arial";
	canvasCtx.fillStyle = "red";
	let textbox = canvasCtx.measureText(`GAME OVER`);
	canvasCtx.fillText("GAME OVER",canvas.width/2 - textbox.width/2,canvas.height/2 - 30);
}
document.addEventListener("keydown",function(event){
	if(!clicked){
	if(event.key == "ArrowUp"){
		if(oppDir != event.key){
			dir = [0, -1];
			oppDir = "ArrowDown";
			clicked = true;
		}
	}
	else if(event.key == "ArrowDown"){
		if(oppDir != event.key){
			dir = [0, 1];
			oppDir = "ArrowUp";
			clicked = true;
		}
	}
	else if(event.key == "ArrowLeft"){
		if(oppDir != event.key){
			dir = [-1, 0];
			oppDir = "ArrowRight";
			clicked = true;
		}
	}
	else if(event.key == "ArrowRight"){
		if(oppDir != event.key){
			dir = [1, 0];
			oppDir = "ArrowLeft";
			clicked = true;
		}
	}
	}
});
function checkIfCorrect(list, arr, bool=false){
	if(arr[0] < 0 || arr[1] < 0 || arr[0] >= dimension || arr[1] >= dimension){
		return false;
	}
	else{
		let current = list.head;
		let i = 0;
		while(current.next != null){
			if(current.data[0] == arr[0] && current.data[1] == arr[1] && i != list.size -1){
				return false;
			}
			if(bool){
				i++;
			}
			current = current.next;
		}
		return true;
	}
}
function selectFruit(){
	fruit = [Math.floor(dimension*Math.random()), Math.floor(dimension*Math.random())];
	while(!checkIfCorrect(snake, fruit, true)){
		fruit = [Math.floor(dimension*Math.random()), Math.floor(dimension*Math.random())];
	}
}
mainLoop = setInterval(function(){
	if(snake != null){
	clear();
//	console.log(snake);
//	debugger;
	if(fruit[0] == snake.tail.data[0] && fruit[1] == snake.tail.data[1]){
		selectFruit();
		score++;
		screen.innerHTML = "Score : " + score + "<br>" + "Size : " + (score + 3);
	}
	else{
		snake.removeHead();
	}
	if(checkIfCorrect(snake, snake.tail.data)){
		draw(snake);
		drawFruit();
		snake.add([snake.tail.data[0] + dir[0], snake.tail.data[1] + dir[1]]);
	}
	else{
		gameOver();
		snake = null;
	}
	clicked = false;
	}
},time);