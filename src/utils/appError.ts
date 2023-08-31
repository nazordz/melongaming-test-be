export class AppError extends Error {
    statusCode: number;
    messagetext: string | undefined;
    status: string;
    isOperational: boolean;

    constructor(message: string | undefined, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
        this.messagetext = message;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
