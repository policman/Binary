// character couner for TextArea(Message) in block Contact
const textArea = document.querySelector('.textArea'); // получаем само поле Message
const textAreaLimit = textArea.getAttribute('maxlength'); // получаем атрибут элемента поля - максимальное кол-во символов
const textCounterSpan = document.querySelector('.txtCounter span'); // получаем span из строки счётчика куда будут выведены цифры

textCounterSpan.innerHTML = textAreaLimit; // изначальное допустимое кол-во символов
textArea.addEventListener('keyup', textSetCounter); // отслеживаем "Отпускание" клавиш 
textArea.addEventListener('keydown', function(event) { // отслеживаем при кол-во при зажатой клавише
	if (event.repeat) textSetCounter(); // вызываем функцию подсчёта
});

function textSetCounter() { // функция подсчёта
	const count = textAreaLimit - textArea.value.length; // считаем оставшееся кол-во символов
	textCounterSpan.innerHTML = count; // выводим это кол-во
}

// display for counter (hidden or not)
const textCounter = document.querySelector('.txtCounter') // получаем строку счётчика

//функция показывающая счётчик при клике на текстовое поле Message и скрывающая счётчик при клике вне поля Message
document.addEventListener('click', (event) => { // отслеживаем "клик" по всему документу

	const messageLabel = document.querySelector('.userMessage');
	if(event.target.closest('.textArea')) {
		textCounter.classList.add('txtCounter--active'); // если клик был по полю - делаем счётчик видимым
		messageLabel.classList.add('active-label');
	} else {
		textCounter.classList.remove('txtCounter--active'); // если клик был вне поля - прячем
		messageLabel.classList.remove('active-label');
	}

	const nameLabel = document.querySelector('.userName');
	if(event.target.closest('.placeName')) {
		nameLabel.classList.add('active-label');
	} else {
		nameLabel.classList.remove('active-label');
	}

	const mailLabel = document.querySelector('.userMail');
	if(event.target.closest('.placeMail')) {
		mailLabel.classList.add('active-label');
	} else {
		mailLabel.classList.remove('active-label');
	}
});

// отображаемый в данный момент раздел сайта (подсвечивается в меню)
// здесь я использую API Intersection Observer
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if(entry.isIntersecting) {
			document.querySelectorAll('.menu__link').forEach((link) => {
				link.classList.toggle(
					'menu__link--active', 
					link.getAttribute("href").replace('#', '') === entry.target.id);
			})
		}
	});
}, {
	threshold: 0.5,
});

document.querySelectorAll('.section').forEach((section) => {
	observer.observe(section);
});

// плавный скрол до разделов сайта через меню навигации
document.querySelector('.menu__body').addEventListener('click', (event) => {
	if(event.target.closest('.menu__link')) {
		event.preventDefault();
		const id = event.target.getAttribute('href').replace('#', '');
		window.scrollTo({
			top: document.getElementById(id).offsetTop,
			behavior: 'smooth',
		});
	}
});

//плавный скрол к блоку about от кнопки readmore на home странице
document.querySelector('.home__readmore').addEventListener('click', (event) => {
	event.preventDefault();
	window.scrollTo({
		top: document.getElementById('section-2').offsetTop,
		behavior: 'smooth',
	});
})