let db;
let openRequest = indexedDB.open("messageappDatabase","2");

openRequest.addEventListener("success",(e) => {
    console.log("success");
    console.log(db);
    db = openRequest.result;
})

openRequest.addEventListener("error",(e) => {
    console.log("error");
})

openRequest.addEventListener("upgradeneeded",(e) => {
    console.log("upgradeneeded");
    db = openRequest.result;
    db.createObjectStore("userInfo",{keyPath:"id"});
    db.createObjectStore("messages",{keyPath:"id"});
})