export default function Card({ card, onCardClick }) {
  return (
    <li className="elements__card">
      <img src={card.link} alt={`Изображение ${card.name}`} className="elements__image" onClick={() => onCardClick({ link: card.link, name: card.name})}/>
      <button className="elements__delete-btn" type="button"/>
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <button className="elements__like" type="button" />
        <span className="elements__like-counter">{card.likes.length}</span>
      </div>
    </li>
  )
}