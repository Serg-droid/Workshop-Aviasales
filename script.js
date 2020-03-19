const formSearch = document.querySelector('.form-search'),
	inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
	dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
	inputCitiesTo = formSearch.querySelector('.input__cities-to'),
	dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
	inputDateDepart = document.querySelector('.input__date-depart');

// Данные --------------------------

let city = [];


const citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
	PROXY = 'https://cors-anywhere.herokuapp.com/',
	API_KEY = '51448a9e4946b299543e01e858e8b616',
	calendar = 'http://min-prices.aviasales.ru/calendar_preload';


//// Функции -------------------------


// Функция получения данных из запросов к API 
const getData = (url, callback) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);

	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return;

		if (request.status === 200) {
			callback(request.response);
		} else {
			console.error(request.status);
		}
	});

	request.send();
};

// Функция вывода списка
const showCity = (dropdown, input) => {

	const wrapped = () => {
			
			dropdown.textContent = '';

			if (input.value === '') {
				return;
			}

			const filterCity = city.filter((item) => {
				const fixItem = item.name.toLowerCase();
				return fixItem.includes(input.value.toLowerCase());
			});
			
			const sortedCity = filterCity.map();

			sortedCity.forEach((item) => {
				const li = document.createElement('li');
				li.classList.add('dropdown__city');
				li.textContent = item.name;
				dropdown.append(li);
			});

		};
	return wrapped;

};

// Функция автозаполнения
const autoFill = (event, dropdown, input) => {
	const target = event.target;
	if (target.tagName.toUpperCase() === 'LI') {
		input.value = target.textContent;
		dropdown.textContent = '';
	}
};

const renderCheapDay = (cheapTicket) => {
	console.log(cheapTicket);
};

const renderCheapYear = (cheapTickets) => {
	console.log(cheapTickets);
};

// Обработка данных, полученных с API календаря цен
const renderCheap = (data, date) => {
	const cheapTicketYear = JSON.parse(data).best_prices;
 	
 	const cheapTicketDay = cheapTicketYear.filter((item) => {
 		return item.depart_date === date;
 	});

 	renderCheapDay(cheapTicketDay);
 	renderCheapYear(cheapTicketYear);
 	
};






// Вывод списка предлагаемых результатов ввода. Куда
inputCitiesFrom.addEventListener('input', showCity(dropdownCitiesFrom, inputCitiesFrom));

// Вывод списка предлагаемых результатов ввода. Откуда
inputCitiesTo.addEventListener('input', showCity(dropdownCitiesTo, inputCitiesTo));

// Автозаполнение поля. Куда
dropdownCitiesFrom.addEventListener('click', () => autoFill(event, dropdownCitiesFrom, inputCitiesFrom));

// Автозаполнение поля. Откуда
dropdownCitiesTo.addEventListener('click', () => autoFill(event, dropdownCitiesTo, inputCitiesTo));

// Работа с результатами формы, формирование объекта с данными полей,
// отправка запроса на API с ценами.
formSearch.addEventListener('submit', (event) => {
	event.preventDefault();

	const cityFrom = city.find((item) => inputCitiesFrom.value === item.name);
	const cityTo = city.find((item) => inputCitiesTo.value === item.name);

	const formData = {
		from: cityFrom.code,
		to: cityTo.code,
		when: inputDateDepart.value,
	}

	const requestData = `?origin=${formData.from}&destination=${formData.to}&depart_date=${formData.when}&one_way=true&token=${API_KEY}`;

	getData(calendar + requestData, (data) => {
		renderCheap(data, formData.when);
	});


});


////// Вызовы функций -----------------------


// Получаем и фильтруем города
getData(PROXY + citiesAPI, (data) => {
	const dataCitites = JSON.parse(data);

	city = dataCitites.filter((item) => {
		if (item.name) {return true}
		return false;
	});
});





