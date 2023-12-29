let db;
let openRequest = indexedDB.open("messageappDatabase","1");

openRequest.addEventListener("success",(e) => {
    db = openRequest.result;
})

openRequest.addEventListener("error",(e) => {
    console.log("error");
})

openRequest.addEventListener("upgradeneeded",(e) => {
    db = openRequest.result;
    db.createObjectStore("username",{keyPath:"id"});
    db.createObjectStore("messages",{keyPath:"id"});
})