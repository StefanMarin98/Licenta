const config = require("./config.json");
const router = require("./routes/api");
const app = require("express")();


app.use(router);

app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));
