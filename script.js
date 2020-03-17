const formSearch = document.querySelector('.form-search'),
	inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
	dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
	inputCitiesTo = formSearch.querySelector('.input__cities-to'),
	dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
	inputDateDepart = document.querySelector('.input__date-depart');

// Список городов
const city = ['Москва', 'Санкт-Петербург', 'Самара', 'Минск', 'Караганда', 
	'Керчь', 'Одесса', 'Ухань', 'Екатеринбург', 'Волгоград'];

// Функция вывода списка
const showCity = (dropdown, input) => {

	const wrapped = () => {
			
			dropdown.textContent = '';

			if (input.value === '') {
				return;
			}

			const filterCity = city.filter((item) => {
				const fixItem = item.toLowerCase();
				return fixItem.includes(input.value.toLowerCase());
			});
			
			filterCity.forEach((item) => {
				const li = document.createElement('li');
				li.classList.add('dropdown__city');
				li.textContent = item;
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


// Вывод списка предлагаемых результатов ввода. Куда
inputCitiesFrom.addEventListener('input', showCity(dropdownCitiesFrom, inputCitiesFrom));

// Вывод списка предлагаемых результатов ввода. Откуда
inputCitiesTo.addEventListener('input', showCity(dropdownCitiesTo, inputCitiesTo));

// Автозаполнение формы. Куда
dropdownCitiesFrom.addEventListener('click', () => autoFill(event, dropdownCitiesFrom, inputCitiesFrom));

// Автозаполнение формы. Откуда
dropdownCitiesTo.addEventListener('click', () => autoFill(event, dropdownCitiesTo, inputCitiesTo));


