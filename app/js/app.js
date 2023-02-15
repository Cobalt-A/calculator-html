// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener("DOMContentLoaded", () => {
	const car_price = document.querySelector("#car_price");
	const range_car_price = document.querySelector("#range_car_price");

	const first_pay = document.querySelector("#first_pay");
	const range_first_pay = document.querySelector("#range_first_pay");
	const percent = document.querySelector(".range__label-percent");

	const time = document.querySelector("#time");
	const range_time = document.querySelector("#range_time");

	const fullSum = document.querySelector(".calculator-form__summ-full");
	const monthsSum = document.querySelector(".calculator-form__summ-months");

	range_car_price.addEventListener("input", (e) => {
		const carPrice = parsNumber(e.target.value);
		const firstPay = Number(
			Math.round((carPrice * Number(percent.innerHTML)) / 100)
		);
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);

		if (carPrice > max) return;
		if (carPrice < min) return;

		car_price.value = format(carPrice);

		range_first_pay.setAttribute("min", (carPrice * 10) / 100);
		range_first_pay.setAttribute("max", (carPrice * 60) / 100);

		range_first_pay.value = Math.round(
			(carPrice * Number(percent.innerHTML)) / 100
		);
		first_pay.value = format(firstPay);

		percent.innerHTML = findPercent(carPrice, firstPay);
	});
	car_price.addEventListener("input", (e) => {
		const carPrice = parsNumber(
			e.target.value.replace(/[^0-9\-()\s]/g, "")
		);
		const firstPay = Number(
			Math.round((carPrice * Number(percent.innerHTML)) / 100)
		);
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);

		if (e.target.value.match(/[^0-9\-()\s]/g))
			e.target.value = format(carPrice);
		if (carPrice > max) return;
		if (carPrice < min) return;

		range_car_price.value = carPrice;

		range_first_pay.setAttribute("min", (carPrice * 10) / 100);
		range_first_pay.setAttribute("max", (carPrice * 60) / 100);

		range_first_pay.value = Math.round(
			(carPrice * Number(percent.innerHTML)) / 100
		);
		first_pay.value = format(firstPay);

		percent.innerHTML = findPercent(carPrice, firstPay);
	});

	range_first_pay.addEventListener("input", (e) => {
		const firsPay = parsNumber(e.target.value);
		const carPrice = parsNumber(car_price.value);
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);

		if (firsPay > max) return;
		if (firsPay < min) return;

		first_pay.value = format(firsPay);
		percent.innerHTML = findPercent(Number(carPrice), firsPay);
	});
	first_pay.addEventListener("input", (e) => {
		const firsPay = parsNumber(e.target.value.replace(/[^0-9\-()\s]/g, ""));
		const carPrice = parsNumber(car_price.value);
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);

		if (e.target.value.match(/[^0-9\-()\s]/g))
			e.target.value = format(firsPay);
		if (firsPay > max) return;
		if (firsPay < min) return;

		range_first_pay.value = firsPay;
		percent.innerHTML = findPercent(carPrice, firsPay);
	});

	range_time.addEventListener("input", (e) => {
		time.value = e.target.value;
	});
	time.addEventListener("input", (e) => {
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);
		const mounthTime = parsNumber(e.target.value);

		console.log(mounthTime > max, mounthTime < min);

		if (mounthTime > max) return;
		if (mounthTime < min) return;

		range_time.value = e.target.value;
	});

	time.addEventListener("focusout", (e) => {
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);
		let num = parsNumber(e.target.value);

		if (num < min) num = min;
		if (num > max) num = max;

		setValue(e.target, num);
	});

	first_pay.addEventListener("focusout", (e) => {
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);
		let num = parsNumber(e.target.value);

		console.log(num);

		if (num < min) num = min;
		if (num > max) num = max;

		setValue(e.target, num);

		percent.innerHTML = findPercent(
			parsNumber(car_price.value),
			parsNumber(first_pay.value)
		);
	});

	car_price.addEventListener("focusout", (e) => {
		const min = Number(
			e.target.parentElement.querySelector(".range__input").min
		);
		const max = Number(
			e.target.parentElement.querySelector(".range__input").max
		);
		let num = parsNumber(e.target.value);

		console.log(num);

		if (num < min) num = min;
		if (num > max) num = max;

		range_first_pay.setAttribute("min", (num * 10) / 100);
		range_first_pay.setAttribute("max", (num * 60) / 100);

		setValue(e.target, num);
		setValue(
			first_pay,
			Math.round((num * Number(percent.innerHTML)) / 100)
		);

		percent.innerHTML = findPercent(
			parsNumber(car_price.value),
			parsNumber(first_pay.value)
		);
	});

	document
		.querySelector(".calculator-form")
		.addEventListener("input", (e) => {
			calcSum();
		});

	document
		.querySelector(".calculator-form__button")
		.addEventListener("click", (e) => {
			const target = e.target.closest(".calculator-form__button");

			const text = target.querySelector(".calculator-form__button-text");
			const loader = target.querySelector(".calculator-form__loader");

			text.classList.add("hide");
			loader.classList.remove("hide");

			setTimeout(() => {
				const obj = {
					carPrice: parsNumber(car_price.value),
					firstPay: parsNumber(first_pay.value),
					percent: percent.value,
					time: time.value,
					monthsSum: parsNumber(monthsSum.innerHTML),
					fullSum: parsNumber(fullSum.innerHTML),
				};
				const json = JSON.stringify(obj);
				text.classList.remove("hide");
				loader.classList.add("hide");

				target.setAttribute("disabled", "");
				car_price.setAttribute("disabled", "");
				first_pay.setAttribute("disabled", "");
				time.setAttribute("disabled", "");
				range_car_price.setAttribute("disabled", "");
				range_first_pay.setAttribute("disabled", "");
				range_time.setAttribute("disabled", "");

				alert(json);
			}, 1000);
		});

	document.querySelectorAll(".range__input").forEach((el) => {
		setRange(el);
		el.addEventListener("input", (e) => {
			setRange(e.target);
		});
	});

	function calcSum() {
		const carPriceMax = Number(
			car_price.parentElement.querySelector(".range__input").max
		);
		const carPriceMin = Number(
			car_price.parentElement.querySelector(".range__input").min
		);
		const firsPayMin = Number(
			first_pay.parentElement.querySelector(".range__input").min
		);
		const firsPayMax = Number(
			first_pay.parentElement.querySelector(".range__input").max
		);
		const timeMin = Number(
			time.parentElement.querySelector(".range__input").min
		);
		const timeMax = Number(
			time.parentElement.querySelector(".range__input").max
		);
		const carPrice = parsNumber(car_price.value);
		const firsPay = parsNumber(first_pay.value);
		const mounthTime = parsNumber(time.value);

		if (carPrice > carPriceMax) return;
		if (carPrice < carPriceMin) return;

		if (firsPay > firsPayMax) return;
		if (firsPay < firsPayMin) return;

		if (mounthTime > timeMax) return;
		if (mounthTime < timeMin) return;

		// (Стоимость автомобиля - Первоначальный взнос) * (0.05 * Math.pow((1 + 0.05), Срок кредита в месяцах) / (Math.pow((1 + 0.05), Срок кредита в месяцах) - 1)

		const msum = Math.round(
			((carPrice - firsPay) * (0.05 * Math.pow(1 + 0.05, mounthTime))) /
				(Math.pow(1 + 0.05, mounthTime) - 1)
		);
		const fsum = Math.round(firsPay + mounthTime * Number(msum));

		monthsSum.innerHTML = format(msum);
		fullSum.innerHTML = format(fsum);
	}

	function setValue(input, num) {
		const field = input.parentElement.querySelector(".range__number");
		const range = input.parentElement.querySelector(".range__input");
		const formatNum = format(num);

		field.value = formatNum;
		range.value = num;
		setRange(range);

		calcSum();
	}

	function format(num) {
		const result = new Intl.NumberFormat("ru-RU").format(num);
		return result;
	}

	function parsNumber(num) {
		const result = Math.round(
			Number(
				num
					.replace(/&nbsp(?:;?)/gi, "\u00A0")
					.replace(/\s/g, "")
					.trim()
			)
		);
		return result;
	}

	function setRange(el) {
		let min = el.min,
			max = el.max,
			val = el.value;

		el.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
	}

	function findPercent(fullSum, fistPay) {
		const result = Math.round((fistPay * 100) / fullSum);
		return result;
	}
});
