'use strict';
window.data = (function () {
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
  // Функция нахождения количества сообщений из массива messagesText
  var getNumberOfComments = function () {
    var comments = [];
    for (var i = 0; i <= window.math.getRandomInt(2); i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.math.getRandomArbitrary(1, 6) + '.svg',
        message: messagesText[window.math.getRandomInt(messagesText.length)],
        name: names[window.math.getRandomInt(names.length)]
      };
    }
    return comments;
  };

  return {
    // Функция формирования массива объектов для фотографий (url, description, лайки, url аватара пользователя комментария, сам комментарий, имя пользователя комментария)
    getPhotos: function (quantity) {
      var photosInformation = [];
      for (var i = 0; i < quantity; i++) {
        photosInformation[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          description: descriptionText[window.math.getRandomInt(descriptionText.length)],
          likes: window.math.getRandomArbitrary(15, 100),
          comments: getNumberOfComments()
        };
      }
      return photosInformation;
    }
  };
})();
