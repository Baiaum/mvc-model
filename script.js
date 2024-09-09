window.addEventListener("load", () => {

    let headerContent = fetch("./header.html").then((res) => {return res.text()})
    
    headerContent.then((headerContent) => {
        let header = document.getElementById("header");
        header.innerHTML = headerContent
    })

})