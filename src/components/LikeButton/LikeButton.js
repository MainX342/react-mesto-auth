import { useEffect, useState} from "react";
import api from "../../utils/api.js";

export default function LikeButton( { likes, myId, cardId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const cardLikeButtonClassName = (`elements__like${isLiked ? ' elements__like_active' : ''}`);

  useEffect(() => {
    setIsLiked(likes.some(i => i._id === myId))
  }, [likes, myId])

  function handleCardLike () {
    if (isLiked) {
      api.deleteLike(cardId)
        .then(res => {
          setIsLiked(false)
          setLikeCount(res.likes.length)
        })
        .catch(err => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          setIsLiked(true)
          setLikeCount(res.likes.length)
        })
        .catch(err => console.error(`Ошибка при добавлении лайка ${err}`))
    }
    setIsLiked(!isLiked)
  }

  return (
    <>
      <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}/>
      <span className="elements__like-counter">{likeCount}</span>
    </>
  )
}