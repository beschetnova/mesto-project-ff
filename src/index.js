// Импорт стилей
import './pages/index.css';

// Импорт изображений карточек
import { initialCards } from './components/cards.js';

// Импорт функций для открытия и закрытия модальных окон
import { openModal, closeModal } from './components/modal.js';

// Импорт функций для работы с карточками
import { createCard, deleteCard, toggleLike } from './components/card.js';

const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Вывод карточки на страницу
initialCards.forEach (card => {
  const cardElement = createCard(card, deleteCard, fillPopupImageInfo, toggleLike);
  placesList.append(cardElement);
});

// Обработчики открытия попапов
profileEditButton.addEventListener ('click', () => {
  openModal(popupTypeEdit);
  setInitialProfileValues();
});

profileAddButton.addEventListener ('click', () => {
  openModal(popupTypeNewCard);
});

// Обработчик закрытия попапов
closeButtons.forEach (button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// Заполнение попапа информацией профиля
function fillPopupImageInfo (card) {
  const popupImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');
  popupImage.src = card.link;
  popupImage.alt = card.alt;
  popupImageCaption.textContent = card.name;
};

// Обработчик события submit при отправке формы
const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__description');

function setInitialProfileValues() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileNameElement.textContent = name;
    profileJobElement.textContent = job;

    closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

// Обработчик события submit при добавлении новой карточки
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const newCardNameInput = newCardForm.elements['place-name'];
const newCardLinkInput = newCardForm.elements.link;

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    
    const name = newCardNameInput.value;
    const link = newCardLinkInput.value;
    const newCardData = {
      name: name,
      link: link,
    };

    const newCardElement = createCard(newCardData, deleteCard, fillPopupImageInfo, toggleLike);
    placesList.prepend(newCardElement);

    newCardForm.reset();
    closeModal(popupTypeNewCard);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

