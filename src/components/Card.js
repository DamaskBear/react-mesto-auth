import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLikedCard = card.likes.some((item) => item._id === currentUser._id);

  const cardDeleteButtonClassName = `elements__pic-bin ${
    isOwn ? "" : "elements__pic-bin_hide"
  }`;

  const cardLikeButtonClassName = `elements__like-button ${
    isLikedCard ? "elements__like-button_active" : ""
  }`;

    const handleCardClick = () => {
        onCardClick(card);
    };

    const handleLikeButtonClick = () => {
        onCardLike(card);
      };
    
    const handleDeleteButtonClick = () => {
        onCardDelete(card);
      };

    return (
        <li className="elements__item card">
            <button
              type="button"
              className={cardDeleteButtonClassName}
              aria-label="Удалить фото"
              onClick={handleDeleteButtonClick}>
            </button>
            <img
              className="elements__photo"
              src={card.link}
              alt={card.name}
              onClick={handleCardClick} />
            <div className="elements__container">
                <p className="elements__name">{card.name}</p>
                <div className="elements__like">
                    <button
                      type="button"
                      className={cardLikeButtonClassName}
                      arial-lable="Like"
                      onClick={handleLikeButtonClick}>
                    </button>
                    <p className="elements__like-count">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default Card;