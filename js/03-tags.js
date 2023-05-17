/*
 * Делегирование
 * - один из многих
 * - несколько из многих и Set
 */

// У нас есть задачка на делегирование событий:

// Мы находим общего предка для всех наших кнопок, а это будет "ul" и повесим на него слушателя, который будет отслеживать все клики внутри него.
// Дата атрибуты мы задаем руками, если не помним, читаем спецификацию к HTML

// const tagsContainer = document.querySelector('.js-tags'); // настраиваем нашу ссылку с контейнером ul.
// let selectedTag = null; // переменная для хранения текущей активной кнопки, в конце мы будем выводить её в консоль

// tagsContainer.addEventListener('click', onTagsContainerClick); // вешаем на контейнер слушателя событий

// // Напишем функцию в которой пропишем условие игнора если клик не по кнопке:
// function onTagsContainerClick(evt) {
//   console.log(evt.target); // достучались, но у нас внутри нашего контейнера, помимо кнопко есть ещё и список из "li", т.е. кликая внутрь контейнера
// // мы можем попадать не на кнопки, а на элементы списка, поэтому нам необходимо ввести условие, если не кнопка то игнор (пока используем подход через nodeName):
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   // Далее мы хотим повесить класс тому элементу на который кликаем:
//   evt.target.classList.add('.tags__btn--active'); // добавили класс, но проблема в том, что в данном случае мы можем выбрать только один(из многих)
//   // активный элемент. Если кликнем на вторую кнопку, то он тоже становится активным, но у первой кнопки по прежнему остается (не убирается) класс. Т.е.
//   // нам необходимо прописать условие, где при каждом клике проверить, если у нас есть предыдущий активный элемент, то мы с него должны снять этот класс.

// // Для этого:
//   // Добавим переменную с поиском активной кнопки:
//   const currentActiveBtn = document.querySelector('.tags__btn--active'); // добавим переменную, котора будет определять текущую активную кнопку (по классу)
//   // console.log(currentActiveBtn); // при первом нажатии на кнопку, значение будет null т.к.до этого класс не назанчался какой либо кнопке.Последующие клики
//   // укажут на уже сущесвующую кнопку с классом
//   // Далее удалим класс с предыдущей кнопки, но если мы пропишем вот так, то: currentActiveBtn.classList.remove('tags__btn--active'); то будет ошибка,
//   // т.к. если нет кнопки на которую был установлен класс, то значение будет равно null, соответственно наша запись будет выглядеть так:
//   // null.classList.remove('tags__btn--active'); а значит будет ошибка т.к.мы пытаемся убрать класс у null.У null нет свойства classList, т.к.это примитив
//   // поэтому будет ошибка в коде.

//   // Поэтому нам необходимо прописать условие в котором будет проверяться: если элемент с классом, который мы ищем существует(т.е.он явно не null), то тогда
//   // можем снимать с него класс, если нет то игнорируем.

//   if (currentActiveBtn) {
//     currentActiveBtn.classList.remove('tags__btn--active');
//   }

// // Этот if можно заменить следующим выражением:
  
//   // currentActiveBtn?.classList.remove('tags__btn--active'); // что делает такая запись "?." ("?" называется необязательно свойство), она говорит, если
//   // на этом месте(перед ?) есть к примеру объекта "currentActiveBtn" либо какой либо другое, но не null или undefined, то оно у этого объекта возьмет
//   // свойство свойство classList, если же на месте объекта будет null или undefined, то выражение после "?".classList.remove('tags__btn--active'); даже
//   // не начнет выполняться. Было уже объяснении в лекции где обсуждали библиотеку лодаш. В данном случае мы можем заменить наш "if" на такое выражение,
//   // т.к. это выражение применимо к работе с свойтвами.

// ___________________________________________________________________________________________________________________________________________________________
// К примеру в этом случае мы без "if" не обойдемся, т.к в нашем условии нет объекта, а выражение
//   // с "?" работает только с свойствами объекта:

// //   const settings = {
// //     them: {
// //       userDefined: {
// //       color: 'tomato'
// //     }
// //   }
// // }

// //   if (settings && settings.them && settings.them.userDefined) {
// //     console.log(settings.them.userDefined.color);
// //   }

//   // Этот if можно заменить так:
//   // settings?.them?.userDefined?.color; // читается это так: если settings это объект, то тогда у него возьми свойство them, если them это
//   // объект то тогда возьми у него свойство userDefined, если userDefined это объект то возьми у него color. Т.е. он будет брать следущий объект, если
//   // предыдущий тоже будет объект:
//   // console.log(settings?.them?.userDefined?.color);
  
//   // Результат будет одинаковым.
  
//   // А без проверки вообще упадёт скрипт:
//   // const settings = null;
// //   // console.log(settings.them.userDefined.color);
// ____________________________________________________________________________________________________________________________________________________________

//   // Ну а далее установим класс, на следующий элемент:
//   const nextActiveBtn = evt.target;
//   nextActiveBtn.classList.add('tags__btn--active');
//   selectedTag = nextActiveBtn.dataset.value; // присвоим нашей переменной (которую объявиили в самом начале), значение текущей активной кнопки. Через
//   // dataset достаем значение атрибута "data-value"

//   console.log(selectedTag); // результат выведем в консоль
// }

// Чистовой вариант:


// const tagsContainer = document.querySelector('.js-tags'); // ссылка на контейнер
// let selectedTag = null; // переменна в которую

// tagsContainer.addEventListener('click', onTagsContainerClick);

// Напишем функцию в которой пропишем условие игнора если клик не по кнопке:
// function onTagsContainerClick(evt) {
//   console.log(evt.target);
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

// Далее мы хотим повесить класс тому элементу на который кликаем, т.е. сделать кнопку активной:
//   evt.target.classList.add('.tags__btn--active');

// Добавим переменную с поиском активной кнопки, по классу:
//   const currentActiveBtn = document.querySelector('.tags__btn--active');

// Пропишем условие: если активная кнопка уже есть, то снять класс:
//   if (currentActiveBtn) {
//     currentActiveBtn.classList.remove('tags__btn--active');
//   }

// Пропишем переменную в которую определим кнопку на которую кликаем:
//   const nextActiveBtn = evt.target;

// Добавим класс новой кнопке на которую кликнули, т.е. сделаем её активной
//   nextActiveBtn.classList.add('tags__btn--active');

// Значение активной кнопки запишем в переменную:
//   selectedTag = nextActiveBtn.dataset.value;

// Выведем в консоль значение активной кнопки:
//   console.log(selectedTag);
// }


// Теперь реализуем и разберем пример в котором этих тегов (кнопок) можно было отобрать сколько угодно:

// const tagsContainer = document.querySelector('.js-tags');

// tagsContainer.addEventListener('click', onTagsContainerClick);

// function onTagsContainerClick(evt) {
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   evt.target.classList.toggle('tags__btn--active'); // вспоминаем свойство toggle, добавляет класс, если нет, или убирает класс если есть. В итоге решаем
//   // задачку выбор многих среди многих, добавлением только одной доп. строки где есть toggle.
// }

// Но возникает проблема в том как мы теперь будем хранить выбранные значение

// const tagsContainer = document.querySelector('.js-tags');

// tagsContainer.addEventListener('click', onTagsContainerClick);

// function onTagsContainerClick(evt) {
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   evt.target.classList.toggle('tags__btn--active');

//   selectedTags.push(evt.target.dataset.value);
//   console.log(selectedTags);
// }

// Все работает, при каждом последующем выборе кнопки, она добавится в массив, но при такой записи у нас возникает другая проблема, если мы хотим
// отключить ранее выбранную кнопку (т.е. убрать из массива), то она снова (повторно добавитьс в массив). Соответственно нам необходимо расширить
// условие, но для этого реализуем не через массив, а через "Set", т.е. через "набор", где "Set" - это набор уникальных элементов, т.е. если мы
// хотим записать в массив две "5", то запишется только одна, т.е. уникальное значение, т.е. уберет дубляжи. Но это работает только с примитивами.
// Если мы попытаемся записать в массив два объекта с одинаковыми значениями, то запишутся два объекта, т.к. это две разные ячейки(объекта) в памяти.

// const tagsContainer = document.querySelector('.js-tags');
// const selectedTags = new Set(); // new Set() создает новый экземпляр объекта Set, который является коллекцией уникальных значений (без повторений).

// tagsContainer.addEventListener('click', onTagsContainerClick);

// function onTagsContainerClick(evt) {
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   evt.target.classList.toggle('tags__btn--active');
//   selectedTags.add(evt.target.dataset.value); // вот и все, и решается проблема с дублированием тегов, дубли исключаются благодаря методу "Set"

//   console.log(selectedTags);
// }

// Остается не решенной проблема, при которой из нашего массива не удаляются те кнопки(теги), которые мы хотим исключить. Реализовывать это условие
// необходимо на той кнопке, которая уже выбрана(добавлена в массив) и которую мы хотим удалить.

// Перепишем(расширим) условие:

// const tagsContainer = document.querySelector('.js-tags');
// const selectedTags = new Set(); // new Set() создает новый экземпляр объекта Set, который является коллекцией уникальных значений (без повторений).

// tagsContainer.addEventListener('click', onTagsContainerClick);

// function onTagsContainerClick(evt) {
//   if (evt.target.nodeName !== 'BUTTON') {
//     return;
//   }

//  const btn = evt.target; // запишем evt.target; в переменную btn
//   // console.log(btn.classList.contains('tags__btn--active')); // проверим через метод contains есть ли у объекта наш класс. При первом клике на кнопку
//   // будет false при повторном клике будет true
//   const isActive = btn.classList.contains('tags__btn--active'); // запишем в перемнную, которая будет провеять true или false
//   const tag = btn.dataset.value; // значение которое хотим проверть
  
// // далее пишем условие:

//     if (isActive) {
//     selectedTags.delete(tag); // пишем, если элемент активный, т.е. содержит наш класс, то удали его 
//   } else {
//     selectedTags.add(tag); // в противном случае (если не активный) добавь его
//   }

// // Тернарным оператором(операция присвоени или возврата), здесь воспользоваться нельзя, т.к.вызывать функции тернарником нельзя.Работать будет, но
// // линтер, анализатор качества кода, будет ругаться на то что у тебя не все хорошо. Тернарник для записи значени по условию, а не для вызова функции по
// // условию  

//   // И далее в любом случае делаем toggle класс, чтобы снять или добавить класс (т.е. записываем или удаляем из set)
//   btn.classList.toggle('tags__btn--active');

//   console.log(selectedTags);
 
// }


// Перепишем начисто:

const tagsContainer = document.querySelector('.js-tags');
const selectedTags = new Set(); // new Set() создает новый экземпляр объекта Set, который является коллекцией уникальных значений (без повторений).

tagsContainer.addEventListener('click', onTagsContainerClick);

function onTagsContainerClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const btn = evt.target;
  const tag = btn.dataset.value;
  const isActive = btn.classList.contains('tags__btn--active');

  if (isActive) {
    selectedTags.delete(tag);
  } else {
    selectedTags.add(tag);
  }

  btn.classList.toggle('tags__btn--active');
  console.log(selectedTags);
}