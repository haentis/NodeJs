import express from "express";

export class Router {
    constructor(controller, config) {
        this.controller = controller;
        this.config = config;
        this.app = express();
    }

    start() {
        this.server = this.app.listen(this.config.port, ()=>{
            console.log("Server started at", this.config.port);
        });
        this.createRoutes()
    }

    stop() {
        this.server.close();
    }

    createRoutes() {
        this.app.get("/", (req, res) => {
            if (this.controller.isSession(req, res)) {
                this.controller.mainUserPage(req, res);
            } else {
                this.controller.mainPageGeneral(req, res);
            }
        });

        this.app.get("/register", (req, res) => {
            if (this.controller.isSession(req, res)) {
                this.controller.mainUserPage(req, res);
            } else {
                this.controller.registrationPage(req, res);
            }
        });

        this.app.get("/login", (req, res) => {
            if (this.controller.isSession(req, res)) {
                this.controller.mainUserPage(req, res);
            } else {
                this.controller.loginPage(req, res);
            }
        });




    }
}