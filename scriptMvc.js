import {appController} from "./Controller/controller.js"

window.addEventListener("load", () => {

    let headerContent = fetch("./header.html").then((res) => {return res.text()})

    headerContent.then((headerContent) => {
        let header = document.getElementById("header");
        header.innerHTML = headerContent
    })

    let addTaskBtn = document.getElementById("addTaskBtn");

    if(addTaskBtn){
        addTaskBtn.addEventListener("click", () => {
            appController.addTask()
        })
    }



})