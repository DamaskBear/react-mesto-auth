import { useState, useEffect, useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    const handleChangeName = (evt) => {
        setName(evt.target.value);
      };
    
    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
      };
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({ name, about: description });
    };


    return (
        <PopupWithForm
                name="edit-form"
                title="Редактировать профиль"
                buttonText="Сохранить"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}>

                <input 
                    className="popup__input popup__input_name"
                    value={name}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChangeName} />
                <span className="popup__input-error name-input-error"></span>

                <input 
                    className="popup__input popup__input_job"
                    value={description}
                    type="text"
                    id="about"
                    name="about"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleChangeDescription}
                />
                <span className="popup__input-error about-input-error"></span>
                </PopupWithForm>
    );
}

export default EditProfilePopup;