import './pages/index.css';

import {
  profileEditButton,
  profileAddButton,
  profileImage,
  popups,
  popupTypeEdit,
  popupTypeAvatar,
  popupTypeImage,
  popupTypeNewCard,
  placesList,
  formEditElement,
  formEditAvatarElement,
  nameInput,
  jobInput,
  avatarInput,
  profileNameElement,
  profileJobElement,
  newCardForm,
  newCardNameInput,
  newCardLinkInput,
  submitButtons,
} from './components/constants.js';

import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getAllCards, editUserInfo, createNewCard, editAvatar } from './components/api.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации форм
enableValidation(validationConfig);

// Промис на получениие данных пользователя
Promise.all([getUserInfo(), getAllCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, user._id);
  })
  .catch((err) => {
    console.error("Ошибка при получении данных пользователя:", err);
  });

// Обновление профиля пользователя
let userId = '';
function setUserInfo (user) {
  userId = user._id;
  profileImage.setAttribute('style', `background-image: url('${user.avatar}')`);
  profileNameElement.textContent = user.name;
  profileJobElement.textContent = user.about;
}

// Вывод карточек на страницу
function renderCards (cards, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, deleteCard, fillPopupImageInfo, toggleLike, userId);
    placesList.append(cardElement);
  });
}

// Обработчики открытия попапов
profileEditButton.addEventListener ('click', openEditProfilePopup);

function openEditProfilePopup () {
  openModal(popupTypeEdit);
  setInitialProfileValues();
  clearValidation(popupTypeEdit, validationConfig);
};

profileAddButton.addEventListener ('click', () => {
  openModal(popupTypeNewCard);
  clearValidation(popupTypeNewCard, validationConfig);
});

profileImage.addEventListener ('click', () => {
  openModal(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
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
  openModal(popupTypeImage);

  const popupImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');

  popupImage.src = card.link;
  popupImage.alt = card.alt;
  popupImageCaption.textContent = card.name;
};

// Изменение текста при загрузке
function renderLoading(isLoading) {
  submitButtons.forEach((button) => {
    if (isLoading) {
      button.textContent = 'Сохранение...';
    } else {
      button.textContent = 'Сохранить';
    }
  });
}

// Обработчик события submit при отправке формы
function setInitialProfileValues() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);

  const name = nameInput.value;
  const about = jobInput.value;

  editUserInfo (name, about)
    .then((user) => {
      profileNameElement.textContent = user.name;
      profileJobElement.textContent = user.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных пользователя:", err);
    })
    .finally(() => {
      renderLoading(false);
    })
}

formEditElement.addEventListener('submit', handleProfileFormSubmit);

// Обработчик события submit при обновлении аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  const newAvatarUrl = avatarInput.value;  

  editAvatar (newAvatarUrl)
    .then((user) => {
      profileImage.setAttribute('style', `background-image: url(${user.avatar})`);
      formEditAvatarElement.reset();
      closeModal(popupTypeAvatar);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false);
    })
}

formEditAvatarElement.addEventListener('submit', handleAvatarFormSubmit);

// Обработчик события submit при добавлении новой карточки
function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);

  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;

  createNewCard(name, link, userId)
    .then((newCard) => {
       const cardElement = createCard(newCard, deleteCard, fillPopupImageInfo, toggleLike, userId);
      placesList.prepend(cardElement);
       newCardForm.reset();
       closeModal(popupTypeNewCard);
     })
     .catch((err) => {
       console.error("Ошибка при создании новой карточки:", err);
    })
    .finally(() => {
       renderLoading(false);
    })
}


newCardForm.addEventListener('submit', handleNewCardFormSubmit);