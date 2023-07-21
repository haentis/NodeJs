import sqlite3 from 'sqlite';

export class Database {
  constructor(config) {
    this.config = config;
    this.db = null;
  }

  async start() {
    this.db = await sqlite3.open(this.config.file);
    await this.createUsers();
    await this.createEvents();
  }

  async stop() {
    await this.db.close();
  }

  async createUsers() {
    const query = `CREATE TABLE IF NOT EXISTS Users(
      id            integer primary key autoincrement,
      telegram_id   integer unique not null,
      telegram_url  text,
      chat_id       integer unique not null,
      name          text
    )`;
    await this.db.exec(query);
  }

  async createEvents() {
    const query = `CREATE TABLE IF NOT EXISTS Events(
      id            integer primary key autoincrement,
      name          text not null,
      city          text not null,
      address       text,
      date          text not null,
      time          text,
      isRegular     integer,
      price         text,
      contact       text,
      org_id        integer not null,
      poster_url    text
    )`;
    await this.db.exec(query);
  }

  async addUser(telegram_id, telegram_url, chat_id, name) {
    const query = `INSERT INTO Users (telegram_id, telegram_url, chat_id, name) VALUES (?, ?, ?, ?)`;
    try {
      await this.db.run(query, [telegram_id, telegram_url, chat_id, name]);
    } catch {
      console.log('Такой пользователь уже есть!');
    }
  }

  async addEvent(name, city, date, org_id, isRegular, address = '', poster_url = '', time = '', price = '', contact = '') {
    const query = `INSERT INTO Events (name, city, date, org_id, isRegular, address, poster_url, time, price, contact) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
      await this.db.run(query, [name, city, date, org_id, isRegular, address, poster_url, time, price, contact]);
      console.log('Событие успешно добавлено!');
    } catch (error) {
      console.log('Ошибка при добавлении события:', error);
    }
  }

  async getEvent(city, date) {
    const query = `SELECT * FROM Events WHERE city = ? AND date = ?`;
    try {
      return await this.db.all(query, [city, date]);
    } catch (error) {
      console.log('Что-то не так с запросом:', error);
    }
  }

  async test() {
    await this.addUser(8690, 1755, 'Gulzhan');
    await this.addEvent('Пример', 'Almaty', '12-01-2024', 1122, 0, 'abay');

    const query = 'SELECT * FROM Users';
    const rows = await this.db.all(query);
    console.log('Юзеры', rows);

    const events = await this.getEvent('Almaty', '12-01-2024');
    console.log(events);
  }
}