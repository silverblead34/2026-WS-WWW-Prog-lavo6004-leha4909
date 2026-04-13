import * as model from "./notes/model.js";
import { render } from "./services/render.js";

function normalizeDateForSQLite(datetimeLocalString) {
    const base = String(datetimeLocalString).slice(0, 16);
    const noT = base.replace("T", " ");
    return noT + ":00";
}

export async function add(request) {
    const now = new Date();
    const isoLocalMinutes = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"

    const html = await render("form.html", {
        formData: { title: "", text: "", date: isoLocalMinutes, topic: "" },
        formError: {},
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}

export async function create(request) {
    const formData = Object.fromEntries(await request.formData());
    const formError = {};

    if (!formData.title || formData.title.trim() === "") {
        formError.title = "Titel darf nicht leer sein.";
    }
    if (!formData.text || formData.text.trim() === "") {
        formError.text = "Text darf nicht leer sein.";
    }
    if (!formData.date || isNaN(Date.parse(formData.date))) {
        formError.date = "Bitte ein gültiges Datum eingeben.";
    }

    if (Object.keys(formError).length > 0) {
        const html = await render("form.html", { formData, formError });
        return new Response(html, {
            status: 400,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }

    const dbDate = normalizeDateForSQLite(formData.date);

    model.create({
        title: formData.title,
        text: formData.text,
        date: dbDate,
        topic: formData.topic || "",
    });

    const notes = model.list();
    const lastNote = notes[notes.length - 1];

    return new Response(null, {
        status: 303,
        headers: { Location: `/note/${lastNote.id}` },
    });
}