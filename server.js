import { initConnection } from "./src/services/db.js";
import { handleRequest } from "./src/app.js";

initConnection("data/notes.sqlite");

const port = 8080;
Deno.serve({ port: port }, handleRequest);