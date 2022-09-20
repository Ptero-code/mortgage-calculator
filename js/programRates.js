import { percentFormatter } from "./formatters.js";

/* процентные ставки по ипотечным программам */
const programBase = 0.12;
const programIt = 0.047;
const programGov = 0.067;
const programZero = 0.108;

/* показываем процентные ставки в радио кнопках */
document.querySelector('#base-value').value = programBase;
document.querySelector('#it-value').value = programIt;
document.querySelector('#gov-value').value = programGov;
document.querySelector('#zero-value').value = programZero;

/* указываем ставку в label */
document.querySelector('#base-text').innerText = percentFormatter.format(programBase);
document.querySelector('#it-text').innerText = percentFormatter.format(programIt);
document.querySelector('#gov-text').innerText = percentFormatter.format(programGov);
document.querySelector('#zero-text').innerText = percentFormatter.format(programZero);

/* отображение выбранной процентной ставки */
const programInputs = document.querySelectorAll('input[name="program"]');
const totalPercent = document.querySelector('#total-percent');

programInputs.forEach((input) => {

    // отображение процентной ставки при первом открытии страницы
    if (input.checked) {
        totalPercent.innerText = percentFormatter.format(input.value)
    }

    // процентная ставка при переключении кнопок

    input.addEventListener('click', function () {
        totalPercent.innerText = percentFormatter.format(this.value);
    })
})