import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddNewCard }) {
  //const currentUser = useContext(CurrentUserContext);
  const defaultState = { name: "", link: "" };
  const [newCard, setNewCard] = useState(defaultState);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddNewCard(newCard);

    setNewCard(defaultState);
  };

  const handleChangeInput = (evt) => {
    setNewCard((newCard) => ({
      ...newCard,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <PopupWithForm
        name="add-form"
        title="Новое место"
        buttonText="Добавить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        
        <input 
            className="popup__input popup__input_place-name"
            value={newCard.name}
            type="text"
            name="name"
            id="place-name"
            placeholder="Название"            
            minLength="2"
            maxLength="30" 
            required 
            onChange={handleChangeInput}/>
        <span className="popup__input-error place-name-input-error"></span>

        <input 
            className="popup__input popup__input_place-link"
            value={newCard.link}
            type="url"
            name="link"
            id="place-link"
            placeholder="Ссылка на картинку"
            required 
            onChange={handleChangeInput}/>
        <span className="popup__input-error place-link-input-error"></span>  
    </PopupWithForm>
  );
}

export default AddPlacePopup;