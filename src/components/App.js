import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForm/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState, useEffect, useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardIdForDelete, setCardIdForDelete] = useState("");

  const setStatesForPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsPopupOpen(false);
  }, []);

  const handleEscKey = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setStatesForPopups();
      }
    },
    [setStatesForPopups]
  );

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isPopupOpen, handleEscKey]);

  const closeAllPopups = useCallback(() => {
    setStatesForPopups();
  }, [setStatesForPopups]);

  function handleEditProfileClick() {
    setIsPopupOpen(true);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsPopupOpen(true);
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsPopupOpen(true);
    setIsEditAvatarPopupOpen(true);
  }

  function handleImageClick(card) {
    setIsPopupOpen(true);
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(cardId) {
    setCardIdForDelete(cardId);
    setIsPopupOpen(true);
    setIsDeleteCardPopupOpen(true);
  }

  function handleSubmitForDeleteCard(evt) {
    evt.preventDefault();
    setIsSending(true);
    api
      .deleteCardFromServer(cardIdForDelete)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardIdForDelete));
        setStatesForPopups();
        setIsSending(false);
      })
      .catch((error) => {
        console.error(`Ошибка при удалении карточки ${error}`);
      });
  }

  function handleUpdateUser(user, resetForm) {
    setIsSending(true);
    api
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        setStatesForPopups();
        resetForm();
        setIsSending(false);
      })
      .catch((error) => {
        console.error(`Ошибка при обновлении данных ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar(user, resetForm) {
    setIsSending(true);
    api
      .setUserAvatar(user)
      .then((res) => {
        setCurrentUser(res);
        setStatesForPopups();
        resetForm();
        setIsSending(false);
      })
      .catch((error) => {
        console.error(`Ошибка при обновлении аватара ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit(card, resetForm) {
    setIsSending(true);
    api
      .addNewCardToServer(card)
      .then((res) => {
        setCards([res, ...cards]);
        setStatesForPopups();
        resetForm();
        setIsSending(false);
      })
      .catch((error) => {
        console.error(`Ошибка при добавлении новой карточки ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при создании начальных данных", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleImageClick}
            onDeleteCard={handleDeleteCardClick}
            cards={cards}
            isLoading={isLoading}
          />
          <Footer />
        </div>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          titleButton="Да"
          sendingText="Удаление..."
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleSubmitForDeleteCard}
          isSending={isSending}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
