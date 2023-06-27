import { useContext } from "react";
import Card from "../Card/Card.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import PageLoader from "../PageLoader/PageLoader.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteCard, cards, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}>
          <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар пользователя" className="profile__avatar"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name ? currentUser.name : ''}</h1>
          <button type="button" className="profile__info-edit" onClick={onEditProfile} />
          <p className="profile__info-description">{currentUser.about ? currentUser.about : ''}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}/>
      </section>
      <section className="elements" aria-label="Фотографии">
        <ul className="elements__list">
          {isLoading ? <PageLoader/> : cards.map(data => {
            return (
              <Card key={data._id} card={data} onCardClick={onCardClick} onDeleteCard={onDeleteCard}></Card>
            )
          })}
        </ul>
      </section>
    </main>
  )
}