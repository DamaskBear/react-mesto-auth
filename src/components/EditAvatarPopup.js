import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarInput = useRef();

    const handleSubmit = (evt) => {
      evt.preventDefault();
  
      onUpdateAvatar({
        avatar: avatarInput.current.value,
      });
  
      avatarInput.current.value = "";
    };

    return(
        <PopupWithForm
        name="avatar-form"
        title="Обновить фото"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >

        <input 
          className="popup__input popup__input_avatar"
          ref={avatarInput}
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
         />
         <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm> 
    )
}

export default EditAvatarPopup;