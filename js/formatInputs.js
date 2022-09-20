import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxPrice = 100000000;

// Inputs
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');

// Cleave опции форматирования
const cleavePriceSetting = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
    
};

const cleavePriceSettingRUB = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
    prefix: ' ₽',
    tailPrefix: true,
};

/* возможность печатать только цифры в сроке кредита */
const cleaveYears = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
};

// Запуск форматирования Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleaveYears);

// Отображение стартовой суммы кредита
calcMortgage();

// Отображение и расчет суммы кредита после ввода данных пользователем
form.addEventListener('input', function () {

    // Расчет суммы кредита
    calcMortgage();
})

function calcMortgage() {


    // Проверка, чтобы стоимость недвижимости не была больше максимальной
    let cost = +cleaveCost.getRawValue();
    if (cost > maxPrice) {
        cost = maxPrice;
    }

    // Общая сумма кредита
    const totalAmount = cost - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);
    console.log(totalAmount);


    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = (creditRate * 100) / 12;

    // Срок ипотеки 
    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    // Расчет ежемесячного платежа
    const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
}

// Cоздание range слайдера (sliderCost)
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: [12000000],
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        min: 0,
        '50%': [10000000, 1000000],
        max: 100000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderCost.noUiSlider.on('update', function () {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
});

// создание range слайдера (sliderDownpayment)
const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: 0,
        max: 100000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderDownpayment.noUiSlider.on('slide', function () {
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
    cleaveDownPayment.setRawValue(sliderValue);
    calcMortgage();
});

// создание range слайдера (sliderTerm)
const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        min: 1,
        max: 30,
    },
    format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
    }),
});

sliderTerm.noUiSlider.on('slide', function () {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();
});

// Форматирование inputCost
inputCost.addEventListener('input', function () {

    const value = +cleaveCost.getRawValue();

    // Обновление range slider

    sliderCost.noUiSlider.set(value);

    // Проверка на максимальную цену

    if (value > maxPrice) inputCost.closest('.param__details').classList.add('param__details--error');

    if (value <= maxPrice) inputCost.closest('.param__details').classList.remove('param__details--error');

    // Зависимость значений downpayment от input cost
    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

    sliderDownpayment.noUiSlider.updateOptions({
        range: {
            min: percentMin,
            max: percentMax,
        },
    });
});


inputCost.addEventListener('change', function () {

    const value = +cleaveCost.getRawValue();

    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(100000000);
    }
});