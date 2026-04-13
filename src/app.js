import * as model from "./routing/model.js";
import { render } from "./services/render.js";
import { add, create } from "./formController.js";

export async function handleRequest(request) {
    const url = new URL(request.url, `http://${request.headers.get("host")}`);
    const path = url.pathname;
    const headers = { "Content-Type": "text/html; charset=utf-8" };

    if (path === "/") {
        const html = await render("index.html", {});
        return new Response(html, { status: 200, headers });
    }

    if (path === "/note") {
        const notes = model.list();
        const html = await render("noteIndex.html", { notes });
        return new Response(html, { status: 200, headers });
    }

    // Formular anzeigen (GET /note/add)
    if (path === "/note/add" && request.method === "GET") {
        return add(request);
    }

    // Formular verarbeiten (POST /note/add)
    if (path === "/note/add" && request.method === "POST") {
        return create(request);
    }

    // Detailansicht einer Notiz
    if (path.startsWith("/note/")) {
        const idStr = path.split("/")[2];
        const id = Number(idStr);

        // Korrekte Prüfung: ist idStr eine Zahl?
        if (!idStr || isNaN(id)) {
            const html = await render("error404.html", {
                message: "Ungültige ID",
            });
            return new Response(html, { status: 404, headers });
        }

        const note = model.get(id);
        if (note) {
            const html = await render("note.html", { note });
            return new Response(html, { status: 200, headers });
        } else {
            const html = await render("error404.html", {
                message: "Notiz nicht gefunden",
            });
            return new Response(html, { status: 404, headers });
        }
    }

    const html = await render("error404.html", {
        message: "Seite nicht gefunden",
    });
    return new Response(html, { status: 404, headers });
}