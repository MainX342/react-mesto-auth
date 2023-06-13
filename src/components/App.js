import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForm/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleImageClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  return (
    <div>
      <div className="page__container">
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleImageClick}
      />
      <Footer/>
      </div>
      <PopupWithForm
        name='profile-edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
        <div className="popup__field">
          <input type="text" className="popup__input popup__input_field_name" placeholder="Имя" name="username" id="username" minLength={2} maxLength={40} required />
          <span className="popup__error popup__error_type_username" />
        </div>
        <div className="popup__field">
          <input type="text" className="popup__input popup__input_field_description" placeholder="Описание" name="description" id="description" minLength={2} maxLength={200} required />
          <span className="popup__error popup__error_type_description" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name='add-card'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >
        <div className="popup__field">
          <input type="text" className="popup__input popup__input_field_name-place" placeholder="Название" name="name" id="name" minLength={2} maxLength={30} required />
          <span className="popup__error popup__error_type_name" />
        </div>
        <div className="popup__field">
          <input type="url" className="popup__input popup__input_field_link" placeholder="Ссылка на картинку" name="link" id="link" required />
          <span className="popup__error popup__error_type_link" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        >
        <div className="popup__field">
          <input type="url" className="popup__input popup__input_field_link" placeholder="Ссылка на картинку" name="avatar" id="avatar" required />
          <span className="popup__error popup__error_type_avatar" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
        titleButton='Да'
        />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}>

      </ImagePopup>
    </div>
  );
}

export default App;
