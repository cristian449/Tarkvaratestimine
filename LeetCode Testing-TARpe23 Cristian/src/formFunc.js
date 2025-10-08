const inputValidationHandler = (e, elements) => {
  const {
    submitBtnEl,
    newsletterCheckboxEl,
    emailContainerEl,
    firstNameInputEl,
    lastNameInputEl
  } = elements;

  let firstNameVal = firstNameInputEl.value;
  let lastNameVal = lastNameInputEl.value;

  if (e.target.name === 'first-name') firstNameVal = e.target.value;
  if (e.target.name === 'last-name') lastNameVal = e.target.value;

  if (firstNameVal?.length > 0 && lastNameVal?.length > 0)
    submitBtnEl.removeAttribute('disabled');
  else
    submitBtnEl.setAttribute('disabled', 'true');

  emailContainerEl.style.display = newsletterCheckboxEl.checked ? 'block' : 'none';
};

const formValidationHandler = (elements) => {
  const {
    firstNameInputEl,
    lastNameInputEl,
    commentsTextEl,
    newsletterCheckboxEl,
    emailInputEl
  } = elements;

  const isSubscribed = newsletterCheckboxEl.checked;
  const isValidEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInputEl.value);

  return (
    firstNameInputEl.value.trim() !== '' &&
    lastNameInputEl.value.trim() !== '' &&
    commentsTextEl.value.trim() !== '' &&
    (!isSubscribed || (isSubscribed && isValidEmail))
  );
};

module.exports = { inputValidationHandler, formValidationHandler };
