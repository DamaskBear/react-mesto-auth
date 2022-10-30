import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";

import api from "../utils/api";
import * as auth from "../utils/authorization";
import { loginMessages, registrationMessages } from "../utils/utils";

import successIcon from "../images/success-signup.svg";
import errorIcon from "../images/error-signup.svg";


function App() {
  const history = useHistory();
  //states
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEdtitProfilePopupOpen, setIsEdtitProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState("");
  const [infoContent, setInfoContent] = useState({ icon: null, text: null });
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser((state) => ({...state, ...userData}));
      })
      .catch((err) => console.error(err));
  }, [loggedIn]);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
  
      if (!token) return;
  
      auth
        .getContent(token)
        .then((res) => {
          setCurrentUser((state) => ({...state, email: res.data.email}) );
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }; 

    checkToken();
  }, [history]);

  // open popups
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEdtitProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };
  // close popups
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEdtitProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setDeletedCard(null);
    setIsInfoOpen(false);
  };

  //actions with card

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = () => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== deletedCard._id)
        );
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addCard(cardData)
      .then((data) => setCards([data, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
  };

  const handleUpdateAvatar = (data) => {
    api
      .changeUserAvatar(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  //registration and login
  const handleRegister = (userData) => {
    return auth
      .registration(userData)
      .then(() => {
        setInfoContent({
          icon: successIcon,
          text: "Вы успешно зарегистрировались!",
        });
        setIsInfoOpen(true);

        setTimeout(() => {
          history.push("/");
          setIsInfoOpen(false);
        }, 1500);
      })
      .catch((resCode) => {
        const registrationMessage = registrationMessages[resCode]
          ? registrationMessages[resCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: registrationMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogin = (loginData) => {
    return auth
      .authorization(loginData)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setCurrentUser((state) => ({...state, email: loginData.email}));
        }
        setLoggedIn(true);
        history.push("/");
      })
      .catch((errorCode) => {
        const errorMessage = loginMessages[errorCode]
          ? loginMessages[errorCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: errorMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    
        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}/>

        <Switch>
          <Route path="/sign-up">
            {<Register onRegister={handleRegister} />}
          </Route>

          <Route path="/sign-in">
            {<Login onLogin={handleLogin} />}
          </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
          </ProtectedRoute>

          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer/>

        <InfoTooltip
          icon={infoContent.icon}
          text={infoContent.text}
          isOpen={isInfoOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEdtitProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />        

        <ImagePopup
         card={selectedCard}
         onClose={closeAllPopups}
         />
    
    </CurrentUserContext.Provider>
  );
}

export default App;