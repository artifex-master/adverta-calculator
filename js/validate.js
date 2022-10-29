<script>
const config = {
  formSelector: '.form__body',
  inputSelector: '.validateInput',
  inputErrorClass: 'validateInput_type_error',
  errorVisibleClass: 'error-message_visible',
  buttonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable'
}

function showInputError(form, input, { inputErrorClass, errorVisibleClass }) {
  const errorContainer = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorVisibleClass);
  errorContainer.textContent = input.validationMessage;
}

function hideInputError(form, input, { inputErrorClass, errorVisibleClass }) {
  const errorContainer = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.textContent = '';
}

function clearInputsError(form, inputs, config) {
  inputs.forEach(input => {
    hideInputError(form, input, config);
  });
}

function toggleButton(form, button, { inactiveButtonClass }) {
  const isFormValid = form.checkValidity();

  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
  }
}

function validateInput(form, input, classes) {
  if (input.validity.valid) {
    hideInputError(form, input, classes);
  } else {
      showInputError(form, input, classes);
  }
}

function enableValidation({ formSelector, inputSelector, buttonSelector, inactiveButtonClass, ...rest }) {
  const form = document.querySelector(formSelector);

    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(buttonSelector);

    toggleButton(form, button, { inactiveButtonClass });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(form, input, rest);
        toggleButton(form, button, { inactiveButtonClass });
      });
    });
}

enableValidation(config);
</script>