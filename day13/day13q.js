var fs = require("fs");

function day13(data) {
	if (!data) {
		return;
	}

	function processedString(value, regex) {
		const lines = value.split(regex);
		let listArray = [];
		let outputText = [];
		for (let i = 0; i < lines.length; i++) {
			// only push this line if it contains a non whitespace character.
			if (/\S/.test(lines[i])) {
				outputText.push('"' + lines[i].trim() + '"');
				listArray.push(lines[i].trim());
			}
		}

		return listArray;
	}

	const rawData = processedString(data, /\n/);

	let x = rawData[1].split(",");

	let busesData = x.map((e) => {
		if (e === "x") {
			return "0";
		}
		return e;
	});

	const buses = busesData.map((e) => parseInt(e));

	let busesCopy = buses.map((e) => e);

	let timeStamp = 0;
	let w = 1;

	busesCopy.forEach((item, index) => {
		if (item === 0) {
		} else {
			for (let a = index; (timeStamp + a) % item !== 0; timeStamp += w) {}
			w *= item;
		}
	});

	console.log(busesCopy);
	console.log(timeStamp);
}

fs.readFile("./data.js", "utf8", function (err, data) {
	if (err) throw err;

	console.log(day13(data));
});
