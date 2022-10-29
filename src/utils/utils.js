const api_url = 'https://mesto.nomoreparties.co/v1/cohort-49';
const token ='59f6a1ae-0384-499e-aebb-f4cb2d0443c0';
const initialValues = {email: '', password: ''};

const loginMessages = {
    400: "Не заполнено одно из полей ",
    401: "Введен неверный e-mail или пароль. Проверьте правильность вводимых данных"
  }
  
  const registrationMessages = {
    400: "Некорректно заполнено одно из полей"
  }

export {api_url, token, initialValues, loginMessages, registrationMessages};