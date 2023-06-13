export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit  }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button type="submit" className="popup__save-btn">{titleButton || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}