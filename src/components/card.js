import { cardTemplate } from '../components/constants.js';
import { deleteCard, addLike, deleteLike } from '../components/api.js';

// Создание карточки
function createCard (data, deleteCard, fillPopupImageInfo, toggleLike, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardLikeCounter.textContent = data.likes.length;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (userId !== data.owner._id) {
    deleteButton.style.display = "none";
    } 
    else {
    deleteButton.addEventListener("click", () => {
      const cardId = data._id;
      deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении карточки:", err);
      })
    })
  }

  cardImage.addEventListener ('click', () => {
    fillPopupImageInfo(data);
  })

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener ('click', () => toggleLike(cardLikeCounter, cardLikeButton, data));

  const isLiked = data.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

// Постановка и удаление лайка
function toggleLike(cardLikeCounter, cardLikeButton, data) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(data._id)
    .then((user) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCounter.textContent = user.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении лайка:", err);
    })
  }
  else {
    addLike(data._id)
    .then((user) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCounter.textContent = user.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении лайка:", err);
    })
  }
}

export { createCard, deleteCard, toggleLike }
