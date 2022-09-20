// форматирование записи процентов
export const percentFormatter = new Intl.NumberFormat('ru-RU', { 
    style: 'percent', 
    maximumFractionDigits: 3,
});

// форматирование символа валюты ₽
export const priceFormatter = new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 0,
});

// округление до десятых
export const priceFormatterDecimals = new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 2,
});