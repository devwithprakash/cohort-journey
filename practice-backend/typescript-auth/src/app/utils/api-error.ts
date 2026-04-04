

class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad request") {
        throw new ApiError(400, message)
    }

    static unauthorized(message = "Unauthorized") {
        throw new ApiError(401, message)
    }

    static notFound(message = "Not found") {
        throw new ApiError(404, message)
    }
}

export default ApiError