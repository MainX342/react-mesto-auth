import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import LikeButton from "../LikeButton/LikeButton.js";

export default function Card({ card, onCardClick, onDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  return (
    <li className="elements__card">
      {isOwn && <button className="elements__delete-btn" type="button" onClick={() => onDeleteCard(card._id)}/>}
      <img src={card.link} alt={`Изображение ${card.name}`} className="elements__image" onClick={() => onCardClick({ link: card.link, name: card.name })}/>
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <LikeButton likes={card.likes} myId={currentUser._id} cardId={card._id}/>
      </div>
    </li>
  )
}