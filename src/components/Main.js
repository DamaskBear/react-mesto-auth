import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";


function Main({cards, onCardClick, onAddPlace, onEditAvatar, onEditProfile, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const cardItems = cards.map((item) => {
        return (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
        )
    });

    return(
        <main className="main">
            <section className="profile">
                <div className="profile__info">
                    <img 
                    className="profile__avatar"
                    src={currentUser.avatar}
                    alt="Фотография пользователя"
                    />
                    <button
                    type="button" 
                    className="profile__edit-avatar-button"
                    onClick={onEditAvatar}>
                    </button>

                    <div className="profile__container">
                        <div className="profile__container-wrapp">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                              type="button"
                              className="profile__edit-button"
                              onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>  
                </div>
                <button
                   type="button"
                   className="profile__add-button"
                   onClick={onAddPlace}>
                </button>
            </section>

            <section className="elements">
                <ul className="elements__card">
                    {cardItems}
                </ul>
            </section>
        </main>
    );
}

export default Main;