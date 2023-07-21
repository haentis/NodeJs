// service.js
class Service {
    constructor(dataStorage) {
        this.dataStorage = dataStorage;
    }

    async getUserById(userId) {
        try {
            const user = await this.dataStorage.getUserById(userId);
            return user;
        } catch (error) {
            console.error('Error getting user from data storage:', error);
            throw new Error('Failed to get user');
        }
    }

    async createUser(name, email, age) {
        try {
            const newUser = await this.dataStorage.createUser(name, email, age);
            return newUser;
        } catch (error) {
            console.error('Error creating user in data storage:', error);
            throw new Error('Failed to create user');
        }
    }
}

export default Service;
