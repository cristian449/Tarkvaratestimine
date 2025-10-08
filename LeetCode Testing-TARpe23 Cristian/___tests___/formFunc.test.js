const { inputValidationHandler, formValidationHandler } = require('../src/formFunc.js');

describe("tagasiside form", () => {
  let formEl, firstNameInputEl, lastNameInputEl, commentsTextEl,
      newsletterCheckboxEl, emailContainerEl, emailInputEl, submitBtnEl;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form-control"></form>
      <input id="first-name-input" name="first-name" />
      <input id="last-name-input" name="last-name" />
      <textarea id="comments"></textarea>
      <label class="email" style="display:none">
        <input id="email-input" />
      </label>
      <input id="newsletter__checkbox" type="checkbox" />
      <button id="submit-btn" disabled="true"></button>
    `;

    formEl = document.getElementById('form-control');
    firstNameInputEl = document.getElementById('first-name-input');
    lastNameInputEl = document.getElementById('last-name-input');
    commentsTextEl = document.getElementById('comments');
    newsletterCheckboxEl = document.getElementById('newsletter__checkbox');
    emailContainerEl = document.querySelector('.email');
    emailInputEl = document.getElementById('email-input');
    submitBtnEl = document.getElementById('submit-btn');
  });

  test('submit disabled kui väljad tühjad', () => {
    inputValidationHandler({ target: { name: 'first-name', value: '' } }, {
      firstNameInputEl, lastNameInputEl, newsletterCheckboxEl, emailContainerEl, submitBtnEl
    });
    expect(submitBtnEl.disabled).toBe(true);
  });

  test('formValidationHandler tagastab false kui email puudu', () => {
    firstNameInputEl.value = "Anton";
    lastNameInputEl.value = "Petrov";
    commentsTextEl.value = "Tere";
    newsletterCheckboxEl.checked = true;
    emailInputEl.value = "";

    const result = formValidationHandler({
      formEl, firstNameInputEl, lastNameInputEl, commentsTextEl,
      newsletterCheckboxEl, emailContainerEl, emailInputEl, submitBtnEl
    });

    expect(result).toBe(false);
  });

  test('tagastab true kui kõik väljad täidetud', () => {
    firstNameInputEl.value = "Anton";
    lastNameInputEl.value = "Petrov";
    commentsTextEl.value = "Tere!";
    newsletterCheckboxEl.checked = true;
    emailInputEl.value = "test@email.com";

    const result = formValidationHandler({
      formEl, firstNameInputEl, lastNameInputEl, commentsTextEl,
      newsletterCheckboxEl, emailContainerEl, emailInputEl, submitBtnEl
    });

    expect(result).toBe(true);
  });
});
