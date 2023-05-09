/*
 * Всплытие событий
 * event.target - целевой (исходный) элемент
 * event.currentTarget - текущий элемент, на слушателе которого поймали событие
 */

const refs = {
  parent: document.querySelector('#parent'),
  child: document.querySelector('#child'),
  innerChild: document.querySelector('#inner-child'),
};

refs.parent.addEventListener('click', onParentClick);
refs.child.addEventListener('click', onChildClick);
refs.innerChild.addEventListener('click', onInnerChildClick);

// Если кликнуть на чаилд, то у refs.parent.addEventListener('click', onParentClick); event.target - будет child,
// а event.currentTarget - будет parent.Т.к.на refs.parent.addEventListener('click', onParentClick); установлен
// слушатель события, в данном случае событие произошедшее на child, всплывает до parent и выше вплоть до виндовс.
// С отлавливанием и всплытием событий на innerChild будет аналогично.Событие всплывет и отловится на parent и
// child.

function onParentClick(evt) {
  console.log('onParentClick');
  console.log('onParentClick -> evt.target', evt.target);
  console.log('onParentClick -> evt.currentTarget', evt.currentTarget);
}

function onChildClick(evt) {
  console.log('onChildClick');
  console.log('onChildClick -> evt.target', evt.target);
  console.log('onChildClick -> evt.currentTarget', evt.currentTarget);
}

function onInnerChildClick(evt) {
  console.log('onInnerChildClick');
  console.log('onInnerChildClick -> evt.target', evt.target);
  console.log('onInnerChildClick -> evt.currentTarget', evt.currentTarget);
}

// Если мы пропишем такую функцию, то обработчик слушателя событий сработает только на виндовс, при условии, что
// других слушателей нет, имеется в виду этих:
// refs.parent.addEventListener('click', onParentClick);
// refs.child.addEventListener('click', onChildClick);
// refs.innerChild.addEventListener('click', onInnerChildClick);

// window.addEventListener('click', e => {
//   console.log(e.target);
//   console.log(e.currentTarget);
// });