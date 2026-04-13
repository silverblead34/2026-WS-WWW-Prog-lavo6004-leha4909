export function createContext(request) {
    return {
        request,
        response: {
            status: 200,
            headers: new Headers({ "Content-Type": "text/plain" }),
            body: "OK",
        },
        setStatus(code) {
            this.response.status = code;
        },
        setHeader(name, value) {
            this.response.headers.set(name, value);
        },
        setBody(content) {
            this.response.body = content;
        },
    };
}