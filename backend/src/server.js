import app from "./app.js";

const port = process.env.DEV_SERVER_PORT || 3030;

app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) });

