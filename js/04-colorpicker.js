const colors = [
  { hex: '#f44336', rgb: '244,67,54' },
  { hex: '#e91e63', rgb: '233,30,99' },
  { hex: '#9c27b0', rgb: '156,39,176' },
  { hex: '#673ab7', rgb: '103,58,183' },
  { hex: '#3f51b5', rgb: '63,81,181' },
  { hex: '#2196f3', rgb: '33,150,243' },
  { hex: '#00bcd4', rgb: '0,188,212' },
  { hex: '#009688', rgb: '0,150,136' },
  { hex: '#4caf50', rgb: '76,175,80' },
  { hex: '#ffeb3b', rgb: '255,235,59' },
  { hex: '#ff9800', rgb: '255,152,0' },
  { hex: '#795548', rgb: '121,85,72' },
  { hex: '#607d8b', rgb: '96,125,139' },
];

// Решим комплексную задачку.У нас есть массив объекто с набором цветов.И у нас есть в разметке div внутри которого,
// необходимо будет динамически создать карточки по заданному шаблону:
  //   <div class="color-card">
  //    <div><div><div> <div
  //     class="color-swatch" // это верхня часть где будет цвет
  //     data-hex="${hex}" // в data атрибут получаем значение hex из свойства hex из массива 
  //     data-rgb="${rgb}" // в data атрибут получаем значение rgb из свойство rgb из массива
  //     style="background-color: ${hex}" // плюс нашему div задаем инлайн стили для фона элемента
  //  ></div></div></div></div>
  //     <div class="color-meta">
  //       <p>HEX: ${hex}</p> // сюда подставим динамическое значение hex для того чтобы отобразить значение на карточке
  //       <p>RGB: ${rgb}</p> // сюда подставим динамическое значение rgb для того чтобы отобразить значение на карточке
  //     </div>
  //   </div>


console.log(createColorCardsMarkup(colors));

// Через createElement разметка создается быстрее чем, если бы браузер парсил на html(пример по которому необходимо создать
// разметку), но єто не критично для средних єлементов в DOM поэтому для удобства возьмем наш шаблон разметки, чтобы создать
// шаблонную строку

// Первый шаг1: создать функцию которая будет собирать разметку
// Пишем функцию:

// function createColorCardsMarkup(colors) {
//   const markup = colors.map(color => {
//     return `
//     <div class="color-card">
//      <div>
//       class="color-swatch"
//       data-hex="#955014"
//       data-rgb="149,80,20"
//       style="background-color: #955014"
//    ></div>
//       <div class="color-meta">
//         <p>HEX: #955014</p> /
//         <p>RGB: 149,80,20</p>
//       </div>
//     </div>
//     `;
//   });

//   console.log(markup);
//   }

// Перепишем функции, в которой деструктуризируем свойства объекта, которые передаем из исходного массива свойств:

// function createColorCardsMarkup(colors) {
//   const markup = colors.map(({ hex, rgb }) => {
//       return `
//     <div class="color-card">
//      <div>
//       class="color-swatch" 
//       data-hex="${hex}"
//       data-rgb="${rgb}" 
//       style="background-color: ${hex}" 
//    ></div>
//       <div class="color-meta">
//         <p>HEX: ${hex}</p> 
//         <p>RGB: ${rgb}</p>
//       </div>
//     </div>
//     `;
//     })

//   return markup; // теперь видем как у нас сформировался целый массив таких карточек
  // }

  // Перепишем более оптимально, т.к. наша переменная const markup лишняя, мы можем сразу возвратить результат меппа:
// function createColorCardsMarkup(colors) {
//  return colors.map(({ hex, rgb }) => {
//       return `
//     <div class="color-card">
//      <div>
//       class="color-swatch" 
//       data-hex="${hex}"
//       data-rgb="${rgb}" 
//       style="background-color: ${hex}" 
//    ></div>
//       <div class="color-meta">
//         <p>HEX: ${hex}</p> 
//         <p>RGB: ${rgb}</p>
//       </div>
//     </div>
//     `;
//     })
// }

// Но так как нам нужен не массив карточек, а одна большая строка, мы объеденим массив наших карточек в такую строку:

function createColorCardsMarkup(colors) {
  return colors.map(({ hex, rgb }) => {
    return `
    <div class="color-card">
     <div>
      class="color-swatch" 
      data-hex="${hex}"
      data-rgb="${rgb}" 
      style="background-color: ${hex}" 
   ></div>
      <div class="color-meta">
        <p>HEX: ${hex}</p> 
        <p>RGB: ${rgb}</p>
      </div>
    </div>
    `;
  }).join('');
}

// В результате получаем одну большую многострочную строку (можно было конечно реализовать через reduce, но map+join используется в React поэтому лучше
// привыкать так)


// Второй шаг2: зарендерить уже готовую разметку в наш div
// Пишем функцию:

// Пишем ссылку на наши элементы: 
const paletteContainer = document.querySelector('.js-palette'); // настроили ссылку на контейнер (наш div) в который будем рендерить разметку
const cardsMarkup = createColorCardsMarkup(colors); // положили в эту переменную нашу готовую разметку описанную в функции на шаге1. Т.е. переменная
// будет хранить результат вызова функции по созданию всей разметки

// Шаг 2. Добавлем нашу строку в контейнер, для создания массива объектов(карточек):  
paletteContainer.insertAdjacentHTML('beforeend', cardsMarkup); // напомню что если мы хотим чтобы браузер сам распарсил нашу строку со всеми
// необходимыми тегами, мы используем insertAdjacentHTML (не innerHTML т.к. в будущем мы может добавлять ещё кучу всего в нашу строку, а напомню,
// что innerHTML используем если хотим очистить, либо добавить в элемент новые данные (на принимаемом элементе ничего нет при этом). В итоге
// мы создали массив карточек с краисивой разметкой

// Наша функция из шага1:
function createColorCardsMarkup(colors) {
  return colors
    .map(({ hex, rgb }) => {
      return `
    <div class="color-card">
     <div>
      class="color-swatch" // это верхня часть где будет цвет
      data-hex="${hex}" // в data атрибут получаем значение hex из свойства hex из массива 
      data-rgb="${rgb}" // в data атрибут получаем значение rgb из свойство rgb из массива
      style="background-color: ${hex}" // плюс нашему div задаем инлайн стили для фона элемента
   ></div>
      <div class="color-meta">
        <p>HEX: ${hex}</p> // сюда подставим динамическое значение hex для того чтобы отобразить значение на карточке
        <p>RGB: ${rgb}</p> // сюда подставим динамическое значение rgb для того чтобы отобразить значение на карточке
      </div>
    </div>
    `;
    })
    .join('');
}

// Теперь создадим функцию, которая будет менять цвет фона на при нажатии на карточку из колекции (но при нажатиии именно на вложенный div),
// а именно <div> class="color-swatch", т.е. в то месте где на карточке подставляется цвет, а не в любое место карточки.

// У нас есть один общий контейнер для нашей коллекции, а значит мы можем использовать делегрование событий

paletteContainer.addEventListener('click', onPaletteContainerClick); // вешаем на наш контейнер слушатель событий и функцию которая будет
// обрабатывать это событие

// А функция будет следующая: если у элемента по которому мы кликнули, т.е. по evt.target у него нет класса 'color-swatch', то мы его не
// обрабатываем:    
function onPaletteContainerClick(evt) {
//   if (!evt.target.classList.contains('color-swatch')) {
//     return;
//   }
// console.log(evt.target);

  // можем переписать через переменную:
  const isColorSwatchEl = evt.target.classList.contains('color-swatch');
if (!isColorSwatchEl) {
    return;
  }

  // Достучавшись до нашего элемента, по клику мы можем теперь получить из него, что угодно. Допустим хотим получить значение атрибута data-hex:
console.log(evt.target.dataset.hex); // по клику на єлемент получим только значение атрибута data-hex


// Теперь мы хотим на наш целевой элемент(evt.target, который имеет класс 'color-swatch') добавить возможность добавлять класс 'is-active', ну и 
// потом при необходимости его снимать:
  
  const swatchEl = evt.target; // создадим переменную которая будет равна целевому єлементу
// далее
  swatchEl.classList.add('is-active'); // после чего наш класс 'is-active' добавляется на сам элемент который имеет класс 'color-swatch', а это
  // не то что мы хотим, потому что класс 'is-active' должен добавляться на саму карточку а не только на div с цветом.
  
  // Здесь интересно: т.е.после того как мы кликнули по нашему div с классом 'color-swatch', мы должны найти карточку в которую он вложен.В нашему
  // случае мы можем найти решение в лоб, т.е. найти родительский элемент этого дива.

  const parentColorCard = swatchEl.parentNode; // cвойство parentNode хранит ссылку на родителя этого элемента. Т.е. в нашем случае на нашу карточку.

  // Почему это не хорошее решение? Потому что наш верстальщик может поменять разметку и после чего наш swatchEl уже лежит со вложенностью в
  // три div и нам уже необходимо будет определить не родителя а предка. 
// Для этого в современном JS есть классный метод: closest который находит ближайший элемент с указанным в () селектором:
  const parentColorCard = swatchEl.closest('.color-card'); // как работает? closest относительно нашего элемента swatchEl пойдёт вверх и найдёт
// ближайший элемент с классом '.color-card' и не важно на какую глубину наш целевой элемент вложен. Если такого класса не найдет то вернет null.

  // и теперь мы на этот parentColorCard добавляем наш classList:
   
  parentColorCard.classList.add('is-active'); // после чего видим что после нажатия на несколько карточек поряд у нас становится сразу несколько
// карточек активными, это потому что мы доавляем класс, но не удаляем. Соответсвенно необходимо добавить воможность снятия класса 'is-active'

// Как быть? Такое мы решали уже в предыдущем примере. Нам необходимо выбрать один из многих.
// Нам необходимо найти текущий активный элемент (т.е. нам необходимо найти комбинированный селектор у которого есть '.color-card' и 'is-active')
// Если будем искать только так 'is-active', то на реальном проекте у нас элементов с таким классом будет много и нам найдёт кучу лишних элементов,
// поэтому мы уточняем наш поиск:
  
  const currentActiveCard = document.querySelector('.color-card.is-active') 
  // далее наше условие:
  if (currentActiveCard) {
    currentActiveCard.classList.remove('.is-active')
  }
  
// Необходимо сначала указать currentActiveCard.classList.remove('.is-active') т.е.снть всем активное состояние, а далее уже устанавливать
// parentColorCard.classList.add('is-active'); класс

// далее мы можем снова получить значение hex для нашей активной карты:  
  console.log(swatchEl.target.dataset.hex);

  // И далее повесить фон на боди из нашей активной карты:

  document.body.style.backgroundColor = swatchEl.target.dataset.hex; 

}

// Это комплексная задача в которой важно не потеряться, прежде чем решать необходимо разложить по - шагам:
// 1. Создать функцию которая рендерит всю нашу разметку(галере), отталкиваясь от шаблона.В итоге получили одну большую строку, которую повесили
// в наш контейнер.
// 2. Второй шаг это реализация делегирования которую повесиили на наш контейнер и далее нагенерили ряд проверок
// 3. Третий шаг начали добавлять всяческие условия снимать класс или добавлять класс, анимашки.

// Необходимо научиться разбивать комплексную задачу на маленькие подзадачи.

// Что нам необходимо сделать для того чтоы оптимизировать решение нашей задачи:
// Необходимо нашу функцию function onPaletteContainerClick(evt), разбить на несколько небольших функций, т.к.она одна делает очень много
// и сразу. И в целом она запутана и не читабельна.

// 1. Задача создание функции добавление и снятие активного класса на/с карточки (т.е. выполнить манипуляции с классом)
// 2. Задача поменять бэкграунд колор на боди

// Вызов трех нижесозданных функций:
addActiveCardClass(parentColorCard);
removeActiveCardClass();
setBodyBgColor(swatchEl.dataset.hex);

// 1.
// Функция добавляет актив класс на карточку:
function addActiveCardClass(card) {
  card.classList.add('is-active');
}

// 2.
// Функция убирает актив класс с карточки:
function removeActiveCardClass() {
  const currentActiveCard = document.querySelector('.color-card.is-active');

  if (currentActiveCard) {
    currentActiveCard.classList.remove('is-active');
  }
}

// 3.
// Фунцкция добавления фона на боди
function setBodyBgColor(color) {
  document.body.style.backgroundColor = color;
}









// Перепишем начисто:

// const paletteContainer = document.querySelector('.js-palette');
// const cardsMarkup = createColorCardsMarkup(colors);

// paletteContainer.insertAdjacentHTML('beforeend', cardsMarkup);

// paletteContainer.addEventListener('click', onPaletteContainerClick);

// function createColorCardsMarkup(colors) {
//   return colors
//     .map(({ hex, rgb }) => {
//       return `
//     <div class="color-card">
//      <div><div><div> <div
//      class="color-swatch"
//      data-hex="${hex}"
//      data-rgb="${rgb}"
//      style="background-color: ${hex}"
//    ></div></div></div></div>
//       <div class="color-meta">
//         <p>HEX: ${hex}</p>
//         <p>RGB: ${rgb}</p>
//       </div>
//     </div>
//     `;
//     })
//     .join('');
// }

// function onPaletteContainerClick(evt) {
//   const isColorSwatchEl = evt.target.classList.contains('color-swatch');

//   if (!isColorSwatchEl) {
//     return;
//   }

//   const swatchEl = evt.target;
//   const parentColorCard = swatchEl.closest('.color-card');

//   removeActiveCardClass();
//   addActiveCardClass(parentColorCard);
//   setBodyBgColor(swatchEl.dataset.hex);
// }

// function setBodyBgColor(color) {
//   document.body.style.backgroundColor = color;
// }

// function removeActiveCardClass() {
//   const currentActiveCard = document.querySelector('.color-card.is-active');

//   if (currentActiveCard) {
//     currentActiveCard.classList.remove('is-active');
//   }
// }

// function addActiveCardClass(card) {
//   card.classList.add('is-active');
// }


// Процентов 75% работы будет связанно с тем чтобы получить из бэкенда набор данных и на основании этих данных создать и зарендерить верстку 