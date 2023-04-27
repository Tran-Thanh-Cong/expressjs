import "dotenv/config";

import App from "./app";
import { validateEnv } from "./utils/validation/validateEnv";
import { UsersRoute } from "./routes/users.route";

validateEnv();

const app = new App([new UsersRoute()], Number(process.env.PORT));

app.listten();
