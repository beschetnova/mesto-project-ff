import { openModal } from'../components/modal.js';
import { 
  popupTypeImage,
  cardTemplate
} from '../components/constants.js';

// Создание карточки
function createCard (data, de32leteCard, fillPopupImageInfo, toggleLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener ('click', () => deleteCard(cardElement));

  cardImage.addEventListener ('click', () => { // THIS
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
