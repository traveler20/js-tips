// -----------------------------
// mousetext circle effect
// -----------------------------
// mousetext definition
const mousetext = document.querySelector(".js-mousetext");

// mousetext insert span
mousetext.innerHTML = mousetext.textContent.replace(/\S/g, "<span>$&</span>");

// mousetext span insert rotate element
const element = document.querySelectorAll("span");
for (let i = 0; i < element.length; i++) {
	element[i].style.transform = "rotate(" + i * 30 + "deg)";
}

// mousetext interlock
document.addEventListener("mousemove", function (e) {
	mousetext.style.left = e.pageX + "px";
	mousetext.style.top = e.pageY + "px";
});
