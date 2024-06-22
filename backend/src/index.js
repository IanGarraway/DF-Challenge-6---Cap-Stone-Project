import AccountRoutes from "./routes/AccountRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import Config from "./config/Config.js";
import Database from "./db/Database.js";
import GameRoutes from "./routes/GameRoutes.js";
import Server from "./server/Server.js";

Config.load();
const { PORT, HOST, DB_URI, ORIGIN } = process.env;

const accountRoutes = new AccountRoutes(ORIGIN);
const adminRoutes = new AdminRoutes(ORIGIN);
const gameRoutes = new GameRoutes(ORIGIN);

const server = new Server(PORT, HOST, accountRoutes, adminRoutes, gameRoutes, ORIGIN);
const database = new Database(DB_URI);

server.start();
await database.connect;