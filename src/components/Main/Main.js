import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Card from "../Card/Card.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [useDescription, setUseDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUseDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((error) => {
        console.error('Ошибка при создании начальных данных', error);
      });
    },[])

  return (
    <main className="content page__content">
      <section className="profile">
        <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__info-name">{userName}</h1>
          <button type="button" className="profile__info-edit" onClick={onEditProfile} />
          <p className="profile__info-description">{useDescription}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}/>
      </section>
      <section className="elements" aria-label="Фотографии">
        <ul className="elements__list">
          {cards.map(data => {
            return (
              <Card key={data._id} card={data} onCardClick={onCardClick}></Card>
            )
          })}
        </ul>
      </section>
    </main>
  )
}