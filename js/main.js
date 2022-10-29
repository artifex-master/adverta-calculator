// Элементы формы
const squareInput = document.querySelector('#square-input');
const squareRange = document.querySelector('#square-range');
const inputs = document.querySelectorAll('input');
const form = document.getElementById('form');

var uploadval = 0;

// Радиокнопки
const radioType = document.querySelectorAll('input[name="type"]');
const radioBuilding = document.querySelectorAll('input[name="building"]');
const radioRooms = document.querySelectorAll('input[name="rooms"]');

// Чекбоксы
const ceilings = document.querySelector('input[name="ceiling"]');
// const walls = document.querySelector('input[name="walls"]');
// const floor = document.querySelector('input[name="floor"]');

let basePrice = 250;

const totalPriceElement = document.querySelector('#total-price');

// Связка range c тектовым полем
// Слушаем событие input
// squareRange.addEventListener('input', function () {
// 	squareInput.value = squareRange.value;
// });

// Связка текстового поля с range
// squareInput.addEventListener('input', function () {
// 	// squareRange.value = 
// 	squareInput;
// });

var now = new Date();
var hour = now.getHours();


//AUDIO UPLOADER 

var myVideos = [];

window.URL = window.URL || window.webkitURL;

document.getElementById('fileUp').onchange = setFileInfo;

function setFileInfo() {
	myVideos = [];																									// Сколько файлов должно быть загружено?
  var files = this.files;
  myVideos.push(files[0]);
  var video = document.createElement('video');
  video.preload = 'metadata';

  video.onloadedmetadata = function() {
    window.URL.revokeObjectURL(video.src);
    var duration = video.duration;
    myVideos[myVideos.length - 1].duration = duration;
    updateInfos();
  }
  video.src = URL.createObjectURL(files[0]);
}

function updateInfos() {
  var infos = document.getElementById('infos');
  infos.textContent = "";
  for (var i = 0; i < myVideos.length; i++) {
    infos.textContent += myVideos[i].name + " длительность: " + Math.round(myVideos[i].duration/60) + ' мин\n';
	console.log(parseInt(Math.round(myVideos[i].duration/60)));
	uploadval = myVideos[i].duration;
	console.log(uploadval);
  }

	calculate();
}
//AUDIO

function calculate() {

	if (hour < 9) {
		basePrice = 350;
	 } else if (hour < 18) {
		basePrice = 250;
	 } else {
		console.log("Help!");
	 }

	let totalPrice = basePrice * parseInt(Math.round(uploadval/60)); // 250

	for (const radio of radioType) {
		if (radio.checked) {
			totalPrice = totalPrice + parseFloat(radio.value)* parseInt(Math.round(uploadval/60)); // 300 000 * 1.2
		}
	}

	for (const radio of radioBuilding) {
		if (radio.checked) {
			totalPrice = totalPrice + parseFloat(radio.value)* parseInt(Math.round(uploadval/60)); // 360 000 * 1.1 = 390 000
		}
	}

	for (const radio of radioRooms) {
		if (radio.checked) {
			totalPrice = totalPrice + parseFloat(radio.value)* parseInt(Math.round(uploadval/60)); // 390 000 * 0.8 = 350 000
		}
	}

	if (ceilings.checked) {
        totalPrice = totalPrice + parseInt(ceilings.value)* parseInt(Math.round(uploadval/60)) ;
	}

	// if (walls.checked) {
	// 	totalPrice = totalPrice + parseFloat(walls.value); // ---
	// }

	// if (floor.checked) {
	// 	totalPrice = totalPrice * parseFloat(floor.value); // ---
	// }

	
	
	const formatter = new Intl.NumberFormat('ru');
	totalPriceElement.innerText = formatter.format(totalPrice);
	
	return totalPrice;
}

// calculate(); //переместил вызов функции в функцию "updateInfos" чтобы при выборе файла Сразу выводилось число в "Стоимость транскрибации"

for (const input of inputs) {
	input.addEventListener('input', function () {
		calculate();
	});
}

function getFormData(form) {
	let formData = new FormData(form);

	let selectedType = document.querySelector('input[type=radio][name=type]:checked');
	let selectedBuilding = document.querySelector('input[type=radio][name=building]:checked');
	let selectedRooms = document.querySelector('input[type=radio][name=rooms]:checked');
	let selectedCeiling = document.querySelector('input[type=checkbox][name=ceiling]:checked');

	formData.set('type', selectedType.nextElementSibling.textContent);
	formData.set('building', selectedBuilding.nextElementSibling.textContent);
	formData.set('rooms', selectedRooms.nextElementSibling.textContent);

	if (selectedCeiling) {
		formData.set('ceiling', selectedCeiling.nextElementSibling.textContent);
	} else {
		formData.set('ceiling', 'Не срочно');
	}

	return formData;
}

function submitForm(e) {
	e.preventDefault();

	let formData = getFormData(form); // здесь все данные формы. достать можно так: formData.get('name')
	let price = calculate();

	console.log(price);

	// for (let [key, value] of test) {
	// 	console.log(`${key} - ${value}`);
	// }

	location=`https://api.paybox.money/payment.php?pg_merchant_id=545908&pg_amount=1000&pg_currency=KZT&pg_description=test&pg_salt=bFViQFrxt0hk1UbC&pg_language=ru&pg_sig=0d238e936102d6245e2f5474ab0226fa`;

	// Email.send({
	// 	SecureToken: '509df232-8e6b-4caa-ab0e-5c9694139b7b',
  //   To : 'kot_sky@mail.ru',
  //   From : 'kotsky123@gmail.com',
  //   Subject : "Привет!!!",
  //   Body : `Имя: ${formData.get('name')} <br> E-mail: ${formData.get('email')}`
	// }).then(message => console.log(message));
}







form.addEventListener('submit', submitForm);
