const fs = require("fs");
const path = require("path");
const Calculate = require("../util/calculate");
const TotalHourse = require("../util/TotalHourse");

const filePath = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"time.json"
);

const getDataFromFile = (cb) => {
	fs.readFile(filePath, (err, fileContent) => {
		if (err || fileContent.length === 0) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

//* Edit Time
exports.getEditTime = (req, res) => {
	const timeId = req.params.timeId;
	getDataFromFile((Times) => {
		const selectedTime = Times.filter((time) => time.id === timeId);

		res.render("times/edit/index.ejs", { Time: selectedTime[0] });
	});
};
exports.postEditTime = (req, res) => {
	const id = req.body.id;
	const Date = req.body.date;
	const Enter = req.body.enter;
	const Exist = req.body.exist;

	getDataFromFile((Times) => {
		const selectedTimeIndex = Times.findIndex((time) => time.id === id);
		console.log('run: ' + selectedTimeIndex)

		let updatedTime = { ...Times[selectedTimeIndex] };
		const updatedProperties = {
			Date: Date,
			Etner: Enter,
			Exist: Exist,
		};

		Object.assign(updatedTime, updatedProperties);
		console.log(updatedTime);
		Times[selectedTimeIndex] = updatedTime;

		fs.writeFile(filePath, JSON.stringify(Times), (err) => {
			if (err) {
				return console.log(err);
			}

			res.redirect("/");
		});
	});
};

//* Delete Time
exports.postDeleteTime = (req, res) => {
	const timeId = req.body.id;

	getDataFromFile((Times) => {
		const remainTime = Times.filter((time) => time.id !== timeId);
		fs.writeFile(filePath, JSON.stringify(remainTime), (err) => {
			if (err) {
				return console.log(err);
			}

			res.redirect("/");
		});
	});
};

//* adding Time
exports.getAddTime = (req, res) => {
	res.render("times/add/index");
};
exports.postAddTime = (req, res) => {
	const id = (Math.random() * 10).toFixed(5);
	const Date = req.body.date;
	const Enter = req.body.enter;
	const Exist = req.body.exist;
	const totalHoursOfDay = Calculate(Enter, Exist);

	getDataFromFile((Times) => {
		Times.push({
			id: id,
			Date: Date,
			Etner: Enter,
			Exist: Exist,
			total: totalHoursOfDay,
		});
		fs.writeFile(filePath, JSON.stringify(Times), (err) => {
			if (err) {
				return console.log(err);
			}

			res.redirect("/");
		});
	});
};

//* Show Time
exports.getShowTime = (req, res) => {
	const HourCost = 42380;
	getDataFromFile((times) => {
		const totalHourse = TotalHourse(times);

		res.render("times/show/index", {
			Times: times,
			totalHours: totalHourse,
			income: totalHourse * HourCost,
		});
	});
};
