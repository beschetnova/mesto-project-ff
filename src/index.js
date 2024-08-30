import './pages/index.css';

import {
  profileEditButton,
  profileAddButton,
  popups,
  popupTypeEdit,
  popupTypeNewCard,
  placesList,
  formEditElement,
  nameInput,
  jobInput,
  profileNameElement,
  profileJobElement,
  newCardForm,
  newCardNameInput,
  newCardLinkInput
} from './components/constants.js';

import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';

// Вывод карточки на страницу
initialCards.forEach (card => {
  const cardElement = createCard(card, deleteCard, fillPopupImageInfo, toggleLike);
  placesList.append(cardElement);
});

// Обработчики открытия попапов
profileEditButton.addEventListener('click', openEditProfilePopup);

function openEditProfilePopup () {
  openModal(popupTypeEdit);
  setInitialProfileValues();
};

profileAddButton.addEventListener ('click', () => {
  openModal(popupTypeNewCard);
});

// Обработчик закрытия попапов на крестик и оверлей
popups.forEach((popup) => {
 popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
   closeModal(popup);
  }
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

formEditElement.addEventListener('submit', handleFormSubmit); 

// Обработчик события submit при добавлении новой карточки
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

