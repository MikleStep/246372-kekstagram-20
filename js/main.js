'use strict';

var photosInformation = [];

// Массив случайных сообщений
var messagesText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!',
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
  var numberOfComments = getRandomInt(2);
  for (var i = 0; i <= numberOfComments; i++) {
    var commentAvatar = 'img/avatar-' + getRandomArbitrary(1, 6) + '.svg';
    var commentMessage = messagesText[getRandomInt(messagesText.length)];
    var commentName = names[getRandomInt(names.length)];
    comments[i] = {
      avatar: commentAvatar,
      message: commentMessage,
      name: commentName
    };
  }
  return comments;
};

// Функция формирования массива объектов для фотографий (url, description, лайки, url аватара пользователя комментария, сам комментарий, имя пользователя комментария)
var getPhoto = function () {
  for (var i = 0; i < 25; i++) {
    var photoUrl = 'photos/' + (i + 1) + '.jpg';
    var photoDescription = '';
    var photoLikes = getRandomArbitrary(15, 100);
    photosInformation[i] = {
      url: photoUrl,
      description: photoDescription,
      likes: photoLikes,
      comments: getNumberOfComments()
    };
  }
  return photosInformation;
};
getPhoto();

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

// Задание 3.3
var modalPhoto = document.querySelector('.big-picture');
modalPhoto.classList.remove('hidden');
var hiddenCount = document.querySelector('.social__comment-count');
hiddenCount.classList.add('hidden');
var hiddenLoader = document.querySelector('.comments-loader');
hiddenLoader.classList.add('hidden');

var renderModalPhoto = function (photo) {
  modalPhoto.querySelector('.big-picture__img img').setAttribute('src', photo.url);
  modalPhoto.querySelector('.likes-count').textContent = photo.likes;
  modalPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  for (var k = 0; k <= photo.comments.length; k++) {
    var commentsWrapper = modalPhoto.querySelector('.social__comments');
    var comment = '<li class="social__comment"><img class="social__picture" src = "' + photo.comments[k].avatar + '" alt = "' + photo.comments[k].name + '" width = "35" height = "35" > <p class="social__text">' + photo.comments[k].message + '</p></li>';
    commentsWrapper.insertAdjacentHTML('afterbegin', comment);
  }
  modalPhoto.querySelector('.social__caption').textContent = photo.description;
  return modalPhoto;
};

for (var j = 0; j < photosInformation.length; j++) {
  renderModalPhoto(photosInformation[j]);
}

var modalActive = document.querySelector('.big-picture');
modalActive.classList.add('modal-open');
