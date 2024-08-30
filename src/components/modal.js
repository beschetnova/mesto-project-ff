// Открытие попапа
function openModal (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', clickEscape);
};

// Закрытие попапа
function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', clickEscape);
};

// Закрытие нажатием на Escape
function clickEscape (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
};

export { openModal, closeModal };