module.exports = function () {
	let date_ob = new Date();
	let day = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let date = year + "-" + month + "-" + day;
	console.log(date);
};
