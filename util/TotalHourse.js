function TotalHourse(totalTimes) {
	let totalTime = 0;
	totalTimes.map((time) => {
		const splitedTime = time.total.split(":");
		const minutes = +splitedTime[0] * 60 + +splitedTime[1];

		totalTime += minutes;
	});
	//* hourse
	let hourse = Math.floor(totalTime / 60);
	//* minutes
	const minutes = totalTime - hourse * 60;
    const minutesInDigits = (minutes / 60).toFixed(1);

	const result = +hourse + +minutesInDigits
	return result;
}

module.exports = TotalHourse;
