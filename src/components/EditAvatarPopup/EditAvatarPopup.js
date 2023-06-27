import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, isSending, onUpdateAvatar }) {
  const { values, errors, isInputValid, isValid, handleChange, resetForm } = useFormValidation();
  const avatarRef = useRef();

  function resetFormOnClose () {
    resetForm()
    onClose()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value }, resetForm);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      sendingText="Сохранение..."
      isOpen={isOpen}
      onClose={resetFormOnClose}
      isSending={isSending}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          ref={avatarRef}
          type="url"
          className={`popup__input popup__input_field_link${isInputValid.avatar === undefined || isInputValid.avatar ? '' : ' popup__input_type_error'}`}
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          required
          value={values.avatar ? values.avatar : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_avatar">{errors.avatar}</span>
      </div>
    </PopupWithForm>
  );
}
