// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";
// Вспомогательные функции
import { _slideUp, _slideDown, _slideToggle } from "../functions.js";
// Модуль прокрутки к блоку
import { gotoBlock } from "../scroll/gotoblock.js";
//================================================================================================================================================================================================================================================================================================================================

// Работа с полями формы. Добавление классов, работа с placeholder
export function formFieldsInit(options = { viewPass: false }) {
    // Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
    const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
    if (formFields.length) {
        formFields.forEach((formField) => {
            if (!formField.hasAttribute("data-placeholder-nohide")) {
                formField.dataset.placeholder = formField.placeholder;
            }
        });
    }
    document.body.addEventListener("focusin", function (e) {
        const targetElement = e.target;
        if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (targetElement.dataset.placeholder) {
                targetElement.placeholder = "";
            }
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
                targetElement.classList.add("_form-focus");
                targetElement.parentElement.classList.add("_form-focus");
            }
            formValidate.removeError(targetElement);
        }
    });
    document.body.addEventListener("focusout", function (e) {
        const targetElement = e.target;
        if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (targetElement.dataset.placeholder) {
                targetElement.placeholder = targetElement.dataset.placeholder;
            }
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
                targetElement.classList.remove("_form-focus");
                targetElement.parentElement.classList.remove("_form-focus");
            }
            // Моментальная валидация
            if (targetElement.hasAttribute("data-validate")) {
                formValidate.validateInput(targetElement);
            }
        }
    });
}
// Валидация форм
export let formValidate = {
    getErrors(form) {
        let error = 0;
        let formRequiredItems = form.querySelectorAll("*[data-required]");
        if (formRequiredItems.length) {
            formRequiredItems.forEach((formRequiredItem) => {
                if (
                    (formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") &&
                    !formRequiredItem.disabled
                ) {
                    error += this.validateInput(formRequiredItem);
                }
            });
        }
        return error;
    },
    validateInput(formRequiredItem) {
        let error = 0;
        if (formRequiredItem.dataset.required === "email") {
            formRequiredItem.value = formRequiredItem.value.replace(" ", "");
            if (this.emailTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
            }
        } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
            this.addError(formRequiredItem);
            error++;
        } else {
            if (!formRequiredItem.value) {
                this.addError(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
            }
        }
        return error;
    },
    addError(formRequiredItem) {
        formRequiredItem.classList.add("_form-error");
        formRequiredItem.parentElement.classList.add("_form-error");
        let inputError = formRequiredItem.parentElement.querySelector(".form__error");
        if (inputError) formRequiredItem.parentElement.removeChild(inputError);
        if (formRequiredItem.dataset.error) {
            formRequiredItem.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${formRequiredItem.dataset.error}</div>`
            );
        }
    },
    removeError(formRequiredItem) {
        formRequiredItem.classList.remove("_form-error");
        formRequiredItem.parentElement.classList.remove("_form-error");
        if (formRequiredItem.parentElement.querySelector(".form__error")) {
            formRequiredItem.parentElement.removeChild(
                formRequiredItem.parentElement.querySelector(".form__error")
            );
        }
    },
    formClean(form) {
        form.reset();
        setTimeout(() => {
            let inputs = form.querySelectorAll("input,textarea");
            for (let index = 0; index < inputs.length; index++) {
                const el = inputs[index];
                el.parentElement.classList.remove("_form-focus");
                el.classList.remove("_form-focus");
                formValidate.removeError(el);
            }
        }, 0);
    },
    emailTest(formRequiredItem) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
    },
};
/* Отправка форм */
export function formSubmit(options = { validate: true }) {
    const forms = document.forms;
    if (forms.length) {
        for (const form of forms) {
            form.addEventListener("submit", function (e) {
                const form = e.target;
                formSubmitAction(form, e);
            });
            form.addEventListener("reset", function (e) {
                const form = e.target;
                formValidate.formClean(form);
            });
        }
    }
    async function formSubmitAction(form, e) {
        const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
        if (error === 0) {
            const ajax = form.hasAttribute("data-ajax");
            if (ajax) {
                // Если режим ajax
                e.preventDefault();
                const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                const formData = new FormData(form);

                form.classList.add("_sending");
                const response = await fetch(formAction, {
                    method: formMethod,
                    body: formData,
                });
                if (response.ok) {
                    let responseResult = await response.json();
                    form.classList.remove("_sending");
                    formSent(form);
                } else {
                    alert("Ошибка");
                    form.classList.remove("_sending");
                }
            } else if (form.hasAttribute("data-dev")) {
                // Если режим разработки
                e.preventDefault();
                formSent(form);
            }
        } else {
            e.preventDefault();
            const formError = form.querySelector("._form-error");
        }
    }
    // Действия после отправки формы
    function formSent(form) {
        // Создаем событие отправки формы
        document.dispatchEvent(
            new CustomEvent("formSent", {
                detail: {
                    form: form,
                },
            })
        );

        // Очищаем форму
        formValidate.formClean(form);
        // Сообщаем в консоль
    }
}
