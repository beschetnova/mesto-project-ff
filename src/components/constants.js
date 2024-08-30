// Кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');

// Попапы
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');

// Создание карточки
export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content; 

// Форма редактирования профиля
export const formEditElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profileNameElement = document.querySelector('.profile__title');
export const profileJobElement = document.querySelector('.profile__description');

// Форма создания новой карточки
export const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
export const newCardNameInput = newCardForm.elements['place-name'];
export const newCardLinkInput = newCardForm.elements.link;