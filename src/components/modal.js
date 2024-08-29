// Открытие попапа
function openModal (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', clickEscape);
  document.addEventListener('click', clickOverlay);
};

// Закрытие попапа
function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', clickEscape);
  document.removeEventListener('click', clickOverlay);
};

// Закрытие нажатием на Escape
function clickEscape (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
};

// Закрытие нажатием на оверлей
function clickOverlay (evt) {
  const popupOpened = document.querySelector('.popup_is-opened');
  if (evt.target === popupOpened) {
    closeModal(popupOpened);
  }
};

export { openModal, closeModal };