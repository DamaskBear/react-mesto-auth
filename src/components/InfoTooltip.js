function InfoTooltip(props) {
    const popupClassName = `popup ${props.isOpen ? "popup_opened" : null}`;
  
    return (
      <div className={popupClassName}>
        <div className="popup__container">
          <img src={props.icon} alt="" className="popup__info-icon" />
          <h2 className="popup__title">{props.text}</h2>
          <button
            className="popup__close-button"
            type="button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;