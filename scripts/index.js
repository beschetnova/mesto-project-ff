// Функция создания карточки
function createCard (data, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__title').textContent = data.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
    
    return cardElement;
}

// Вывод карточки на страницу
initialCards.forEach(card => {
    const placesList = document.querySelector('.places__list');
    const cardElement = createCard(card, deleteCard);
    
    placesList.append(cardElement);
  });

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};
