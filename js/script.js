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

// popupы картинок, "Read More" в блоке портфолио и логотипы партнёров
// принцип их работы - есть ОДНА конструкция попапа, и в зависимости на какой блок
// открывающий попап нажал пользователь, будет открыта эта конструкция с наполнением из JS для конкретного блока
// 		Почему я сделал так: возможно если бы я просто сверстал каждый отдельный попап в html они работали бы
// на доли-секунды быстрее и проще бы было локализовать под разные языки, но я специально решил реализовать их
// с помощью JS, чтобы лишний раз с ним попрактиковаться.
document.querySelector('body').addEventListener('click', (event) => {
	const popup = document.querySelector('.popup');
	const imageElement = document.querySelector('.popup__image');
	const headerElement = document.querySelector('.popup__header');
	const textElement = document.querySelector('.popup__text');

	function loadData(headerText, text, source) {
		// load image
		if(source) {
			imageElement.src = source;
			imageElement.classList.remove('popup__image--disable');
		}
		// load header
		if(headerText) {
		headerElement.textContent = headerText;
		}
		// load text
		if(text) {
		textElement.textContent = text;
		}
		// activate popup
		document.body.style.overflow = 'hidden';
		popup.classList.add('activePopup');
	}
	if(event.target.closest('.popup-image-1')) {
		loadData('Project number 1', "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque?", "img/portfolio/1.jpg");
	}
	else if(event.target.closest('.popup-image-2')) {
		loadData('Project number 2', "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque?", "img/portfolio/2.jpg");
	}
	else if(event.target.closest('.popup-image-3')) {
		loadData('Project number 3', "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque?", "img/portfolio/2.jpg");
	}
	else if(event.target.closest('.popup-image-4')) {
		loadData('Project number 4', "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque?", "img/portfolio/4.webp");
	}
	else if(event.target.closest('.portfolio__readmore')) {
		event.preventDefault();
		imageElement.classList.add('popup__image--disable');
		loadData('About our projects', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit? About our projects, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eaque optio voluptate nisi perspiciatis ratione quod incidunt et quam corrupti reiciendis fugit, tenetur, excepturi magni asperiores quae ex, mollitia error ipsum aperiam quos deleniti vitae delectus voluptates? Molestias harum ratione laborum veritatis et placeat quidem, enim ullam sint quo nisi quasi esse possimus deserunt in voluptatem consequatur asperiores itaque? Dicta recusandae facere nam sed facilis tempore ullam enim officia impedit?');
	}
	else if(!event.target.closest('.popup__wrapper')) {
		document.body.style.overflow = 'visible';
		popup.classList.remove('activePopup');
	}
	
});