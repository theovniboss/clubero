import app from "./index.js";

const port = Bun.env.DEV_SERVER_PORT || 3030;

app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) });
