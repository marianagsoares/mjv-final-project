export class NotFoundError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }

    getStatusCode() {
        return this.statusCode;
    }
}