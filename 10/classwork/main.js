
import { Application } from "./bin/app.js";
import router from "./route.js";

const config = {
    database: {
        file: "database.sdb"
    },
    server: {
        port: 3000
    }
}

const app = new Application(config);


app.use(router);

app.start();
