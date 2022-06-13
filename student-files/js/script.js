console.log('test');
const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');
const url = 'https://randomuser.me/api/?results=12&nat=us';
let data;

async function getData(url) {
	data = await fetch(url);
	data = await data.json();
	data = await data.results;
	displayData(data);
}

function displayData(data) {
	console.log(data);

	data.forEach((person) => {
		const card = document.createElement('div');
		card.classList.add('card');
		const cardInfoContainer = document.createElement('div');
		cardInfoContainer.classList.add('card-info-container');
		const cardImgContainer = document.createElement('div');
		cardImgContainer.classList.add('card-img-container');
		gallery.appendChild(card);
		card.appendChild(cardImgContainer);
		card.appendChild(cardInfoContainer);

		const cardImage = document.createElement('img');
		cardImage.classList.add('card-img');
		cardImage.src = person.picture.large;
		cardImage.alt = 'profile picture';
		cardImgContainer.appendChild(cardImage);

		const name = document.createElement('h3');
		name.classList.add('card-name', 'cap');
		name.id = 'name';
		name.innerText =
			person.name.title + ' ' + person.name.first + ' ' + person.name.last;
		const email = document.createElement('p');
		email.classList.add('card-text');
		email.innerText = person.email;
		const address = document.createElement('p');
		address.classList.add('card-text', 'cap');
		address.innerText = person.location.city + ', ' + person.location.state;
		cardInfoContainer.appendChild(name);
		cardInfoContainer.appendChild(email);
		cardInfoContainer.appendChild(address);
	});

	const cards = document.querySelectorAll('.card');
	cards.forEach((card) => {
		card.addEventListener('click', (e) => {
			console.log('clicked');
			let modalNameValue;
			let modalEmailValue;
			let modalCityValue;
			let modalAddressValue;
			let modalPhoneValue;
			let modalDOBValue;
			//grab something
			const imgCheck = card.firstElementChild.firstElementChild.src;
			data.forEach((person) => {
				if (person.picture.large === imgCheck) {
					console.log('checked');
					//declare modal values
					modalNameValue =
						person.name.title +
						' ' +
						person.name.first +
						' ' +
						person.name.last;
					modalEmailValue = person.email;
					modalCityValue = person.location.city;
					modalAddressValue =
						person.location.street.number +
						' ' +
						person.location.street.name +
						', ' +
						person.location.city +
						', ' +
						person.location.state +
						', ' +
						person.location.postcode;
					modalPhoneValue = person.phone;

					modalDOBValue = 'Birthday ' + birthdayHelper(person.dob.date);
				}
			});

			const modalContainer = document.createElement('div');
			modalContainer.classList.add('modal-container');
			body.appendChild(modalContainer);
			const modal = document.createElement('div');
			modal.classList.add('modal');
			modalContainer.appendChild(modal);

			const modalCloseButton = document.createElement('button');
			modalCloseButton.type = 'button';
			modalCloseButton.classList.add('modal-close-btn');
			modalCloseButton.id = 'modal-close-btn';
			const strong = document.createElement('strong');
			strong.innerText = 'X';
			modalCloseButton.appendChild(strong);
			modal.appendChild(modalCloseButton);
			modalCloseButton.addEventListener('click', (e) => {
				modalContainer.style.display = 'none';
			});

			const modalInfoContainer = document.createElement('div');
			modalInfoContainer.classList.add('modal-info-container');
			modal.appendChild(modalInfoContainer);

			const modalImage = document.createElement('img');
			modalImage.classList.add('modal-img');
			modalImage.alt = 'profile picture';
			modalImage.src = imgCheck;
			modalInfoContainer.appendChild(modalImage);

			modalName = document.createElement('h3');
			modalName.classList.add('modal-name', 'cap');
			modalName.id = 'name';
			modalName.innerText = modalNameValue;
			modalInfoContainer.appendChild(modalName);

			const modalEmail = document.createElement('p');
			modalEmail.classList.add('modal-text');
			modalEmail.innerText = modalEmailValue;
			modalInfoContainer.appendChild(modalEmail);

			const modalCity = document.createElement('p');
			modalCity.classList.add('modal-text', 'cap');
			modalCity.innerText = modalCityValue;
			modalInfoContainer.appendChild(modalCity);

			const midline = document.createElement('hr');
			modalInfoContainer.appendChild(midline);

			const modalPhone = document.createElement('p');
			modalPhone.classList.add('modal-text');
			modalPhone.innerText = modalPhoneValue;
			modalInfoContainer.appendChild(modalPhone);

			const modalAddress = document.createElement('p');
			modalAddress.classList.add('modal-text');
			modalAddress.innerText = modalAddressValue;
			modalInfoContainer.appendChild(modalAddress);

			const modalDOB = document.createElement('p');
			modalDOB.classList.add('modal-text');
			modalDOB.innerText = modalDOBValue;
			modalInfoContainer.appendChild(modalDOB);

			console.log(e.target);
		});
	});
}

function birthdayHelper(date) {
	let extractedDate = date.substring(0, 10);
	extractedDate = extractedDate.split('-');
	extractedDate =
		extractedDate[1] + '/' + extractedDate[2] + '/' + extractedDate[0];
	console.log(extractedDate);
	return extractedDate;
}

// function phoneHelper(num) {
// 	let numParts = num.split('-');
// }

const searchContainer = document.querySelector('.search-container');
const searchForm = document.createElement('form');
searchForm.action = '#';
searchForm.method = 'GET';
searchContainer.appendChild(searchForm);

const searchBar = document.createElement('input');
searchBar.type = 'search';
searchBar.id = 'search-input';
searchBar.classList.add('search-input');
searchBar.placeholder = 'Search...';
searchForm.appendChild(searchBar);

const searchSubmit = document.createElement('input');
searchSubmit.type = 'submit';
searchSubmit.value = '&#127859;';
searchSubmit.id = 'search-submit';
searchSubmit.classList.add('search-submit');
searchForm.appendChild(searchSubmit);

searchSubmit.addEventListener('click', (e) => {
	const searchData = data.filter((person) => {
		console.log(
			person.name.first.toUpperCase(),
			'**',
			searchBar.value.toUpperCase()
		);
		person.name.first.toUpperCase().includes(searchBar.value.toUpperCase()) ||
			person.name.last.toUpperCase().includes(searchBar.value.toUpperCase()) ||
			person.name.title.toUpperCase().includes(searchBar.value.toUpperCase());
	});

	displayData(searchData);
});

getData(url);