let container = document.querySelector(".container");
let inputContainer = document.querySelector(".input-container");
let input = document.querySelector(".text-input");
let sendBtn = document.querySelector(".sendBtn");
let body = document.body;
let theme = "light";
let themeDiv = document.querySelector(".theme");
let themeIcon = document.querySelector(".theme-icon");
let message;
let nameName = null;

setTimeout(() => {
	
}, 100);

myName = prompt("Enter Your Name");
	while (myName === null) {
		myName = prompt("Enter Your Name");
		}
		if (db) {
			let dbTransaction = db.transaction("userInfo", "readwrite");
			let userInfoObjectStore = dbTransaction.objectStore("userInfo");
			let userUniqueID = "info-" + Math.random().toString(16).slice(2);
			let userInfoObject = {
				id: userUniqueID,
				name: myName,
			};
			userInfoObjectStore.add(userInfoObject);
		}
	

sendBtn.addEventListener("click", (e) => {
	sendMessage();
});

document.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		sendMessage();
	}
});

themeDiv.addEventListener("click", (e) => {
	if (theme === "light") {
		themeIcon.setAttribute("src", "icons/dark.png");
		theme = "dark";
		modeChange(theme);
	} else {
		themeIcon.setAttribute("src", "icons/light.png");
		theme = "light";
		modeChange(theme);
	}
});

function modeChange(theme) {
	if (container.hasChildNodes()) {
		message = container.querySelectorAll(".messageContainer");
	}
	if (theme === "dark") {
		body.classList.add("dark-mode-body");
		if (message) {
			message.forEach((element) => {
				element.classList.add("dark-mode-message");
			});
		}
	} else {
		body.classList.remove("dark-mode-body");
		if (message) {
			message.forEach((element) => {
				element.classList.remove("dark-mode-message");
			});
		}
	}
}

function sendMessage() {
	if (input.value) {
		let data = {
			name: myName,
			message: input.value,
		};
		input.value = "";
		socket.emit("message", data);
	}
}

socket.on("message", (data) => {
	let messageElement = document.createElement("div");
	messageElement.setAttribute("class", "messageContainer");
	let userName = document.createElement("p");
	userName.setAttribute("class", "name");
	userName.innerText = data.name != myName ? data.name : "You";
	if(db){
		let messageUniqueID = "msg-" + Math.random().toString(16).slice(2);
		let msgDbTransaction = db.transaction("messages","readwrite");
		let msgObjectStore = msgDbTransaction.objectStore("messages");
		let messageObject = {
			id:messageUniqueID,
			message:data.message
		}
		msgObjectStore.add(messageObject)
	}
	if (data.name === myName) {
		messageElement.classList.add("right");
	}

	let message = document.createElement("p");
	message.setAttribute("class", "message");
	message.innerText = data.message;
	if (theme === "dark") {
		messageElement.classList.add("dark-mode-message");
	}
	messageElement.appendChild(userName);
	messageElement.appendChild(message);

	container.appendChild(messageElement);
	container.scrollTop = container.scrollHeight;
});
