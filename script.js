
const buttons = document.querySelectorAll(".nav");

const pages = document.querySelectorAll(".page");


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("detailsLink").href =
    "details.html?id=" + encodeURIComponent(id);

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>btn.classList.remove("active"));

        pages.forEach(page=>page.classList.remove("active"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.page)
            .classList.add("active");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

});