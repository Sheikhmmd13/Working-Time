const cursor = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
console.log(cursor);

window.addEventListener("mousemove", (e) => {
	const posX = e.clientX;
	const posY = e.clientY;

	//* cursor dot
	cursor.style.left = `${posX}px`;
	cursor.style.top = `${posY}px`;

	//* cursor outline
	cursorOutline.animate(
		{
			left: `${posX}px`,
			top: `${posY}px`,
		},
		{ duration: 500, fill: "forwards" }
	);
});
