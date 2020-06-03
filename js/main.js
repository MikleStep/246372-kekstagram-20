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
  return Math.floor(Math.random() * Math.floor(max));
};

// Функция нахождения количества сообщений из массива messagesText
var getNumberOfMessages = function () {
  var numberOfMessages = getRandomInt(2);
  var messageText = '';
  if (numberOfMessages === 1) {
    messageText = messagesText[getRandomInt(messagesText.length)];
  } else {
    messageText = messagesText[getRandomInt(messagesText.length)] + ' ' + messagesText[getRandomInt(messagesText.length)];
  }
  return messageText;
};

// Функция формирования массива объектов для фотографий (url, description, лайки, url аватара пользователя комментария, сам комментарий, имя пользователя комментария)
var getPhoto = function () {
  for (var i = 0; i < 25; i++) {
    var photoUrl = 'photos/' + (i + 1) + '.jpg';
    var photoDescription = '';
    var photoLikes = getRandomArbitrary(15, 100);
    var commentAvatar = 'img/avatar-' + getRandomArbitrary(1, 6) + '.svg';
    var commentName = names[getRandomInt(names.length)];
    photosInformation[i] = {
      url: photoUrl,
      description: photoDescription,
      likes: photoLikes,
      comment: {
        avatar: commentAvatar,
        message: getNumberOfMessages(),
        name: commentName
      }
    };
  }
  return photosInformation;
};


getPhoto();
