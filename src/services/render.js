import nunjucks from "npm:nunjucks@3.2.4";

const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader("src/templates", {
        noCache: true,
    }),
    { autoescape: true },
);

export function render(path, data = {}) {
    return env.render(path, data);
}