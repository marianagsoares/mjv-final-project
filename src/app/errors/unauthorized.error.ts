export class UnauthorizedError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }

    getStatusCode() {
        return this.statusCode;
    }
}
