import { openModal } from'../components/modal.js';
import { popupTypeImage } from '../index.js';

// Создание карточки
function createCard (data, deleteCard, fillPopupImageInfo, toggleLike) {
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.alt;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener ('click', () => deleteCard(cardElement));

  cardElement.querySelector('.card__image').addEventListener('click', () => {
    fillPopupImageInfo(data);
    openModal(popupTypeImage);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener ('click', () => toggleLike(likeButton));

  return cardElement;
};

// Удаление карточки
function deleteCard (cardElement) {
  cardElement.remove();
};

// Нажатие на лайк
function toggleLike (button) {
  button.classList.toggle('card__like-button_is-active');
}; 

export { createCard, deleteCard, toggleLike };
