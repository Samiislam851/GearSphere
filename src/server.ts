import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
    try {
        // create db connection
        const result = await mongoose.connect(config.database_url as string)
        console.log('connected to DB at host ', result.connection.host, ', database : ', result.connection.name);
        app.listen(config.port, () => {
            console.log('Listening to port ', config.port);
        })
    } catch (error) {
        console.log(error);
    }
}

main()