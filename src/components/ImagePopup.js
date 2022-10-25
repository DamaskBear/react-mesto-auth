function ImagePopup({card, onClose}) {
    return (
        <div
            className={`popup popup_type_fullscreen-photo ${
                card ? 'popup_opened' : ""}`
            }>
            <div className="popup__photo-container">
                <img
                  className="popup__fullscreen-photo"
                  src={card ? card.link : '#'}
                  alt={card ? card.name : ""}
                />
                <figcaption className="popup__fullscreen-caption">
                    {card ? card.name : ""}
                </figcaption>
                <button 
                  className="popup__close-button"
                  type="button"
                  onClick={onClose}>
                </button>
            </div>
        </div>
    );
}

export default ImagePopup;