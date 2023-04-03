export class InsuficientParamsError extends Error {
    private statusCode: number;

    constructor(message: string){
        super();
        this.message = message;
        this.name = 'InsuficientParamsError';
        this.statusCode = 422;
    }

    getStatusCode(){
        return this.statusCode;
    }
}