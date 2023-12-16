function Calculate(enter, exist) {
	const splitedEnter = enter.split(":");
	const start = +splitedEnter[0] * 60 + +splitedEnter[1];

	const splitedExist = exist.split(":");
	const end = +splitedExist[0] * 60 + +splitedExist[1];

	let timeDiff = end - start;

	//* hourse
	let hourse = Math.floor(timeDiff / 60);
	//* minutes
	timeDiff -= hourse * 60;

	const result = [
		hourse.toString().padStart(2, "0"),
		timeDiff.toString().padStart(2, "0"),
	].join(":");

	return result
}

module.exports = Calculate;
