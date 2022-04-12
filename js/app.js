(function () {
  "use strict";
  const form = document.querySelector(".js-form");
  const passwordInput = document.querySelector(".js-passwordInput");
  const showPasswordButton = document.querySelector(
    ".js-showPasswordButton"
  );

  const showAlertMessage = (alert, input) => {
    alert.removeAttribute("hidden");
    alert.setAttribute("role", "alert");
    input.classList.add("is-invalid");
  };

  const hideAlertMessage = (alert, input) => {
    setTimeout(() => {
      alert.setAttribute("hidden", "");
      alert.removeAttribute("role");
      input.classList.remove("is-invalid");
    }, 10000);
  };

  const handleAlert = input => {
    const alerts = document.querySelectorAll(".js-alert");
    alerts.forEach(alert => {
      const inputID = input.dataset.id;
      const alertID = alert.dataset.id;
      if (inputID === alertID) {
        showAlertMessage(alert, input);
        hideAlertMessage(alert, input);
      }
    });
  };

  const validateName = (name, input) => {
    /**
     *
     * Names must be
     * - At least two characters long, max length anything
     * - Include at least one vowel letter
     *
     * @author Vanza Setia <https://github.com/vanzasetia>
     *
     */
    const nameValidation =
      /^((?=.*[aiueo])|(?=.*[AIUEO]))[A-Za-z]{2,}$/;
    const isValid = nameValidation.test(name);
    if (!isValid) {
      handleAlert(input);
    }
    return isValid;
  };

  const validateEmail = (email, input) => {
    /**
     *
     * Emails
     * - Must have account name that must be
     *   - At least two characters long, max length 30 characters
     *   - It can contain numbers, letters, and period
     * - Must have only one @ symbol
     * - Must have first top level domain that must be
     *   - At least two characters long, max length three characters
     *   - It can contain numbers, letters, and period
     * - May contain the second top level domain
     *   - At least two characters long, max length three characters
     *   - It can contain numbers, letters, and period
     *
     * @example
     * // returns true
     * const emailValidation =
     * /^(?:[a-z0-9.]){2,30}@{1}(?:[a-z0-9-]){2,30}\.{1}(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/
     * emailValidation.test("hi@yo.me")
     *
     * @author Vanza Setia <https://github.com/vanzasetia>
     *
     */
    const emailValidation =
      /^(?:[a-z0-9.]){2,30}@{1}(?:[a-z0-9-]){2,30}\.{1}(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/;
    const isValid = emailValidation.test(email);
    if (!isValid) {
      handleAlert(input);
    }
    return isValid;
  };

  const validatePassword = (password, input) => {
    /**
     *
     * Passwords must be
     * - At least 12 characters long, max length anything
     * - Include at least 1 lowercase letter
     * - 1 capital letter
     * - 1 number
     * - 1 special character => !@#$%^&*
     *
     * @author Harish Chaudhari <harishchaudhari.com>
     *
     */
    const passwordValidation =
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{12,}$/;
    const isValid = passwordValidation.test(password);
    if (!isValid) {
      handleAlert(input);
    }
    return isValid;
  };

  const checkAllUserInputs = () => {
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;

    const inputs = document.querySelectorAll(".js-input");
    inputs.forEach(input => {
      const id = input.dataset.id;
      const value = input.value;
      switch (id) {
        case "firstName":
          isFirstNameValid = validateName(value, input);
          break;
        case "lastName":
          isLastNameValid = validateName(value, input);
          break;
        case "email":
          isEmailValid = validateEmail(value, input);
          break;
        case "password":
          isPasswordValid = validatePassword(value, input);
          break;
        default:
          console.error(
            `The input ${id} is not match the existing data-id`
          );
      }
    });

    const isFormValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid;

    return isFormValid;
  };

  const validateUserInputs = event => {
    const areAllUserInputsValid = checkAllUserInputs();
    if (!areAllUserInputsValid) {
      event.preventDefault();
    }
  };

  const togglePasswordVisibility = () => {
    const eyeIcon = document.querySelector(".js-eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.src = "/svg/eye-blocked.svg";
      eyeIcon.alt = "Hide Password";
    } else {
      passwordInput.type = "password";
      eyeIcon.src = "/svg/eye.svg";
      eyeIcon.alt = "Show Password";
    }
  };

  const countPasswordLength = () => {
    const passwordLength = document.querySelector(
      ".js-passwordLength"
    );
    passwordLength.textContent = passwordInput.value.length;
  };

  form.addEventListener("submit", validateUserInputs);
  showPasswordButton.addEventListener(
    "click",
    togglePasswordVisibility
  );
  passwordInput.addEventListener("input", countPasswordLength);
})();
