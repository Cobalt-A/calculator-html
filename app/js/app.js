// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	const car_price = document.querySelector('#car_price');
	const range_car_price = document.querySelector('#range_car_price');
	
	const first_pay = document.querySelector('#first_pay');
	const range_first_pay = document.querySelector('#range_first_pay');
	const percent = document.querySelector('.range-content__label-percent')

	const time = document.querySelector('#time');
	const range_time = document.querySelector('#range_time');

	const fullSum = document.querySelector('.calculator-form__summ-full')
	const monthsSum = document.querySelector('.calculator-form__summ-months')



	range_car_price.addEventListener('input', function (e) {
		car_price.value = e.target.value;
		range_first_pay.setAttribute('min', (e.target.value * 10)/100)
		range_first_pay.setAttribute('max', (e.target.value * 60)/100)

		range_first_pay.value = Math.round((e.target.value * Number(percent.innerHTML))/100)
		first_pay.value = Math.round((e.target.value * Number(percent.innerHTML))/100)

		percent.innerHTML = findPercent(e.target.value, first_pay.value)
	});
	car_price.addEventListener('input', function (e) {
		range_car_price.value = e.target.value;
		range_first_pay.setAttribute('min', (e.target.value * 10)/100)
		range_first_pay.setAttribute('max', (e.target.value * 60)/100)

		range_first_pay.value = Math.round((e.target.value * Number(percent.innerHTML))/100)
		first_pay.value = Math.round((e.target.value * Number(percent.innerHTML))/100)

		percent.innerHTML = findPercent(e.target.value, first_pay.value)
	});


	range_first_pay.addEventListener('input', function (e) {
		first_pay.value = Math.round(e.target.value)
		percent.innerHTML = findPercent(Number(car_price.value), first_pay.value)
	});
	first_pay.addEventListener('input', function (e) {
		range_first_pay.value = Math.round(e.target.value)
		percent.innerHTML = findPercent(Number(car_price.value), first_pay.value)
	});


	range_time.addEventListener('input', function (e) {
		time.value = e.target.value;
	});
	time.addEventListener('input', function (e) {
		range_time.value = e.target.value;
	});


	document.querySelector('.calculator-form').addEventListener('input', (e) => {
		const msum = Math.round((Number(car_price.value) - Number(first_pay.value)) * ((0.05 * Math.pow(Number(time.value), 0.05))/(Math.pow(Number(time.value), 0.05))))
		const fsum = Math.round(Number(first_pay.value) + Number(time.value) * Number(msum))

		monthsSum.innerHTML = new Intl.NumberFormat('ru-RU').format(msum)
		fullSum.innerHTML =  new Intl.NumberFormat('ru-RU').format(fsum)
	})


	document.querySelector('.calculator-form__button').addEventListener('click', (e) => {

		const target = e.target.closest('.calculator-form__button')

		const text = target.querySelector('.calculator-form__button-text')
		const loader = target.querySelector('.calculator-form__loader')

		console.log(text);
		console.log(loader);

		text.classList.add('hide')
		loader.classList.remove('hide')
		
		setTimeout(() => {
			const obj = {
				carPrice: car_price.value,
				firstPay: first_pay.value,
				percent: percent.value,
				time: time.value,
				monthsSum: monthsSum.innerHTML.replace(/&nbsp(?:;?)/ig,'\u00A0').replace(/\s/g, ""),
				fullSum: fullSum.innerHTML.replace(/&nbsp(?:;?)/ig,'\u00A0').replace(/\s/g, "")
			}
			const json = JSON.stringify(obj);

			text.classList.remove('hide')
			loader.classList.add('hide')
			target.setAttribute('disabled', '')

			alert(json)			
		}, 1000)
		
	})


	function findPercent(fullSum, fistPay) {
		const result = Math.round((fistPay * 100)/fullSum)
		return result
	}



})
