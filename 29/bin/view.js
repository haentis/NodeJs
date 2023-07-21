import TelegramBot from 'node-telegram-bot-api';
const log = console.log;

export class Telegram {
  users = {};

  constructor(config) {
    this.config = config;
    this.bot = new TelegramBot(this.config.token, { polling: true });
    this.bot.onText(/\/start/, this.startHandler.bind(this));
    this.bot.onText(/.*/, this.textHandler.bind(this));
    this.bot.on('callback_query', this.buttonHandler.bind(this));
  }

  startHandler(message) {
    const chatId = message.chat.id;
    this.users[chatId] = {
      state: 'wait_command',
      event: {},
      chatId: chatId,
    };

    this.bot.sendMessage(chatId, 'Что по плану?', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Узнать о событиях', callback_data: 'find_events' },
            { text: 'Создать событие', callback_data: 'create_event' },
          ],
        ],
      },
    });
  }

  textHandler(message) {
    const chatId = message.chat.id;
    const user = this.users[chatId];
    if (user) {
      this.process(user, message.text);
    } else {
      this.bot.sendMessage(chatId, 'Отправьте /start');
    }
  }

  buttonHandler(query) {
    const chatId = query.message.chat.id;
    const user = this.users[chatId];
    if (user) {
      this.process(user, query.data);
    }
  }

  process(user, message) {
    switch (user.state) {
      case 'wait_command':
        if (message === 'find_events') {
          this.bot.sendMessage(user.chatId, 'В каком городе?');
          user.state = 'wait_city';
        } else if (message === 'create_event') {
          this.bot.sendMessage(user.chatId, 'Название мероприятия?');
          user.state = 'wait_name';
        }
        break;

      case 'wait_name':
        if (!message || message.trim() === '') {
          user.state = 'wait_command';
          this.process(user, 'create_event');
        } else {
          user.event.name =
            message.slice(0, 1).toUpperCase() + message.slice(1).toLowerCase();
          this.bot.sendMessage(user.chatId, 'В каком городе?');
          user.state = 'wait_city';
        }
        break;

      case 'wait_city':
        if (!message || message.trim() === '') {
          user.state = 'wait_name';
        } else {
          user.event.city =
            message.slice(0, 1).toUpperCase() + message.slice(1).toLowerCase();
          this.bot.sendMessage(user.chatId, 'Дата мероприятия (напр. 01.12.2023)?');
          user.state = 'wait_date';
        }
        break;

      case 'wait_date':
        if (!message || message.trim() === '') {
          user.state = 'wait_city';
        } else {
          user.event.date = message;
          if (!user.event.name) {
            this.bot.sendMessage(user.chatId, 'Сейчас скажу...').then((sentMessage) => {
              this.lastMessageId = sentMessage.message_id;
            }).catch((error) => {
              console.error(error);
            });
            user.state = null;
            this.emit('search', user.chatId, user.event.city, user.event.date);
          } else {
            user.event.org_id = user.chatId;
            user.event.contact_name = user.current_user.telegramUrl;

            this.bot.sendMessage(user.chatId, 'Сколько дней продлится?');
            user.state = 'wait_regular';
          }
        }
        break;

      case 'wait_regular':
        user.event.isRegular = message;
        this.bot.sendMessage(user.chatId, 'Адрес мероприятия: ');
        user.state = 'wait_address';
        break;

      case 'wait_address':
        user.event.address = message;
        this.bot.sendMessage(user.chatId, 'Время');
        user.state = 'wait_time';
        break;

      case 'wait_time':
        user.event.time = message;
        this.bot.sendMessage(user.chatId, 'Контактный телефон');
        user.state = 'wait_contact';
        break;

      case 'wait_contact':
        user.event.contact = message;
        user.state = null;
        this.bot.sendMessage(user.chatId, 'Событие опубликовано!');
        this.emit('addEvent', user.chatId, user.event, user.current_user);
        break;
    }
  }

  startSearch(callback) {
    this.onSearch = callback;
  }

  startAddEvent(callback) {
    this.onAddEvent = callback;
  }
}