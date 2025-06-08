const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");

function showTasks(){
    listContainer.innerHTML=localStorage.getItem("data");
}

function addTask(){
    if(inputBox.value === '' )
    {
        alert("You must Write Something !");
    }
    else
    {
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value="";
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

showTasks();

if('serviceWorker' in navigator) {
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('sw.js').then(reg=>console.log('Service Worker Registered',reg)).catch(err=>console.error('Service Worker Registration Falied',err));
    }
)}
