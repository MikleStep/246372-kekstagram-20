'use strict';

// Массив случайных сообщений
var messagesText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!',
];

var descriptionText = [
  'Lorem ipsum',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore',
  'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  'On the other hand'
];

// Массив случайных имен
var names = [
  'Артём',
  'Ксенья',
  'Филипп',
  'Артур',
  'Ольга',
  'Витя',
  'Егор',
  'Аня',
  'Анастасия',
  'Виктор',
  'Ольга',
  'Оля',
  'Ярослав',
  'Петр',
  'Наталья',
  'Наталия'
];

// Рандомизатор от/до
var getRandomArbitrary = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Рандомизатор до определенного числа
var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

// Функция нахождения количества сообщений из массива messagesText
var getNumberOfComments = function () {
  var comments = [];
  for (var i = 0; i <= getRandomInt(2); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomArbitrary(1, 6) + '.svg',
      message: messagesText[getRandomInt(messagesText.length)],
      name: names[getRandomInt(names.length)]
    };
  }
  return comments;
};

// Функция формирования массива объектов для фотографий (url, description, лайки, url аватара пользователя комментария, сам комментарий, имя пользователя комментария)
var getPhotos = function (quantity) {
  var photosInformation = [];
  for (var i = 0; i < quantity; i++) {
    photosInformation[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: descriptionText[getRandomInt(descriptionText.length)],
      likes: getRandomArbitrary(15, 100),
      comments: getNumberOfComments()
    };
  }
  return photosInformation;
};
var photosInformation = getPhotos(25);

// Вывод фотографий в DOM из массива данных
var picturesElement = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (photo) {
  var pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', photo.url);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return pictureElement;
};

var pictureFragment = document.createDocumentFragment();
for (var i = 0; i < photosInformation.length; i++) {
  pictureFragment.appendChild(renderPicture(photosInformation[i]));
}

picturesElement.appendChild(pictureFragment);

// Открытие и закрытие модального окна (Big Picture)
var bigPicture = document.querySelector('.big-picture');
var bigPictureOpen = document.querySelector('.picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var onPopupEscPress = function (target) {
  return function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal(target);
    }
  };
};
var openModal = function (target) {
  target.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress(target));
};

var closeModal = function (target) {
  target.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress(target));
};

bigPictureOpen.addEventListener('click', function () {
  openModal(bigPicture);
});

bigPictureClose.addEventListener('click', function () {
  closeModal(bigPicture);
});


// Задание 3.3
var modalPhoto = document.querySelector('.big-picture');

var renderModalPhoto = function (photo) {
  modalPhoto.querySelector('.big-picture__img img').setAttribute('src', photo.url);
  modalPhoto.querySelector('.likes-count').textContent = photo.likes;
  modalPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  for (var k = 0; k < photo.comments.length; k++) {
    var commentsWrapper = modalPhoto.querySelector('.social__comments');
    var comment = '<li class="social__comment"><img class="social__picture" src = "' + photo.comments[k].avatar + '" alt = "' + photo.comments[k].name + '" width = "35" height = "35" > <p class="social__text">' + photo.comments[k].message + '</p></li>';
    commentsWrapper.insertAdjacentHTML('afterbegin', comment);
  }
  modalPhoto.querySelector('.social__caption').textContent = photo.description;
  return modalPhoto;
};

renderModalPhoto(photosInformation[0]);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

// Задание 4.2.1 Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadWrapper = document.querySelector('.img-upload__overlay');

uploadWrapper.classList.remove('hidden');
uploadFile.addEventListener('change', function () {
  openModal(uploadWrapper);
});

uploadClose.addEventListener('click', function () {
  closeModal(uploadWrapper);
  uploadFile.value = '';
});

// Задание 4.2.2 Редактирование изображения и ограничения, накладываемые на поля

var imgIncrease = uploadWrapper.querySelector('.scale__control--bigger');
var imgReduce = uploadWrapper.querySelector('.scale__control--smaller');
var imgSize = uploadWrapper.querySelector('.scale__control--value');
var imgPreview = document.querySelector('.img-upload__preview img');

var changeSizeImg = function (step) {
  imgSize.value = parseInt(imgSize.value, 10);
  if (Number(imgSize.value) + step > 100) {
    imgSize.value = 100;
  } else if (Number(imgSize.value) + step < 25) {
    imgSize.value = 25;
  } else if (imgSize.value !== 25 && imgSize.value !== 100) {
    imgSize.value = (Number(imgSize.value) + step);
  }
  imgPreview.style.transform = 'scale:' + ('0.' + imgSize.value);
  return imgSize.value;
};

imgIncrease.addEventListener('click', function () {
  var newImgValue = changeSizeImg(25) + '%';
  imgSize.value = newImgValue;
  imgSize.setAttribute('value', newImgValue);
});

imgReduce.addEventListener('click', function () {
  var newImgValue = changeSizeImg(-25) + '%';
  imgSize.value = newImgValue;
  imgSize.setAttribute('value', newImgValue);
});

// Задание 4.2.3 Наложение эффекта на изображение

var effectsOptions = document.querySelectorAll('.effects__radio');
var effectSaturation = document.querySelector('.effect-level__value');
var effectSaturationPin = document.querySelector('.effect-level__pin');

var getEffectSaturation = function () {

};

var effectsInformation = [
  {
    name: 'none',
    filter: 'none',
    start: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale(',
    start: '1)'
  },
  {
    name: 'sepia',
    filter: 'sepia(',
    start: '1)'
  },
  {
    name: 'marvin',
    filter: 'invert(',
    start: '100%)'
  },
  {
    name: 'phobos',
    filter: 'blur(',
    start: '3)'
  },
  {
    name: 'heat',
    filter: 'brightness(',
    start: '3px)'
  }
];

var addThumbnailClickHandler = function (thumbnail, effect) {
  thumbnail.addEventListener('click', function () {
    imgPreview.setAttribute('class', '');
    imgPreview.classList.add('effects__preview--' + effect.name);
    imgPreview.style.filter = effect.filter + effect.start;
    effectSaturation.value = '100';
    effectSaturation.setAttribute('value', '100');
  });
};

for (var a = 0; a < effectsOptions.length; a++) {
  addThumbnailClickHandler(effectsOptions[a], effectsInformation[a]);
}
