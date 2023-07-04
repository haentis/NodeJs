const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6177617837:AAGhopUKlswVTmExfvjv0rSA_mSo7lxyUUs';
const apikey = '264f562674f64130b2f102048230407'; 

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Введите название города, для которого вы хотите получить информацию о погоде');
});


bot.onText(/(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const city = match[1];

  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`);
    const data = response.data;

    const weatherCondition = data.current.condition.text;
    const temperature = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const windDirection = data.current.wind_dir;

    const weatherEmoji = getWeatherEmoji(weatherCondition);
    const weatherMessage = `Погода в городе ${city}:\n\n${weatherEmoji} ${weatherCondition}\nТемпература: ${temperature}°C\nОщущается как: ${feelsLike}°C\nВлажность: ${humidity}%\nСкорость ветра: ${windSpeed} км/ч\nНаправление ветра: ${windDirection}`;

    bot.sendMessage(chatId, weatherMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Подробный прогноз на 3 дня',
              callback_data: 'forecast_3days',
            },
            {
              text: 'Краткий прогноз на 10 дней',
              callback_data: 'forecast_10days',
            },
          ],
        ],
      },
    });
  } catch (error) {
    bot.sendMessage(chatId, 'Ошибка при получении данных о погоде. Пожалуйста, попробуйте еще раз.');
  }
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const action = query.data;

  if (action === 'forecast_3days') {
    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, 'Подробный прогноз на 3 дня');
  } else if (action === 'forecast_10days') {
    bot.deleteMessage(chatId, messageId);
    bot.sendMessage(chatId, 'Краткий прогноз на 10 дней');
  }
});


function getWeatherEmoji(condition) {
  switch (condition) {
    case 'Clear':
      return '☀️';
    case 'Cloudy':
      return '☁️';
    case 'Rain':
      return '🌧️';
    case 'Snow':
      return '❄️';
    default:
      return '';
  }
}
