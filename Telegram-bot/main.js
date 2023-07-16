const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const botToken = '6177617837:AAGhopUKlswVTmExfvjv0rSA_mSo7lxyUUs';

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Введите название города, для которого вы хотите получить информацию о погоде');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const cityName = msg.text;

  // Получаем погоду
  getWeather(cityName)
    .then((weather) => {

      const message = formatWeatherMessage(weather);


      bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Подробный прогноз на 3 дня', callback_data: 'detailed' },
              { text: 'Краткий прогноз на 10 дней', callback_data: 'brief' }
            ]
          ]
        }
      });
    })
    .catch((error) => {
      bot.sendMessage(chatId, 'Не удалось получить информацию о погоде. Попробуйте еще раз.');
    });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const buttonType = query.data;

  if (buttonType === 'detailed') {

    bot.sendMessage(chatId, 'Подробный прогноз на 3 дня');
  } else if (buttonType === 'brief') {

    bot.sendMessage(chatId, 'Краткий прогноз на 10 дней');
  }


  bot.deleteMessage(chatId, messageId);
});


function getWeather(cityName) {
  const apiKey = '618a03e8c10c4fc6b11115320231607';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to get weather data');
    });
}

function formatWeatherMessage(weather) {
  const location = weather.location.name;
  const localTime = weather.location.localtime;
  const condition = weather.current.condition.text;
  const temperature = weather.current.temp_c;
  const feelsLike = weather.current.feelslike_c;
  const humidity = weather.current.humidity;
  const windSpeed = weather.current.wind_kph;
  const windDirection = weather.current.wind_dir;

  const weatherEmoji = getWeatherEmoji(condition);

  const message = `
    <b>${location}</b>
    ${localTime}
    ${weatherEmoji} ${condition}
    Температура: ${temperature} °C
    Ощущается как: ${feelsLike} °C
    Влажность: ${humidity}%
    Ветер: ${windSpeed} км/ч, ${windDirection}
  `;

  return message;
}

function getWeatherEmoji(condition) {
  switch (condition) {
    case 'Sunny':
      return '☀️';
    case 'Partly cloudy':
      return '🌤';
    case 'Cloudy':
      return '☁️';
    case 'Overcast':
      return '🌥';
    case 'Mist':
      return '🌫';
    case 'Patchy rain possible':
    case 'Patchy freezing drizzle possible':
      return '🌦';
    case 'Patchy light rain':
    case 'Light drizzle':
    case 'Light rain':
      return '🌧';
    case 'Patchy light snow':
    case 'Light snow':
      return '🌨';
    case 'Patchy moderate snow':
    case 'Moderate snow':
      return '🌨❄️';
    case 'Patchy heavy snow':
    case 'Heavy snow':
      return '❄️🌨';
    case 'Patchy light rain with thunder':
    case 'Moderate or heavy rain with thunder':
      return '⛈';
    default:
      return '';
  }
}
