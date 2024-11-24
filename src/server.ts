import app from "./app";

async function main() {
    const port = 5000
    try {
        // create db connection
        app.listen(port, () => {

            console.log('Listening to port ', port);

        })
    } catch (error) {

    }
}

main()