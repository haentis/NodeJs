// control.js
class Controller {
    constructor(service) {
        this.service = service;
    }

    async getUserById(req, res) {
        const userId = req.params.id;

        try {
            const user = await this.service.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async createUser(req, res) {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const newUser = await this.service.createUser(name, email, age);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default Controller;

