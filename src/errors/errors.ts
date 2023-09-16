export function notFoundError(message: string) {
    const errorMessage: string = `${message && message} Not Found`.trim();
    return {
        type: "not-found",
        message: errorMessage,
    };
}

export function conflictError(message: string) {
    const errorMessage: string = `${message && message} Already Exists`.trim();
    return {
        type: "conflict",
        message: errorMessage,
    };
}

export function unauthorized(message: string) {
    return {
        type: "unauthorized",
        message: message || `Unauthorized Access`,
    };
}

export function unprocessableEntity(message: string) {
    const errorMessage: string = `${message && message
        } is not a valid input`.trim();
    return {
        type: "unprocessable-entity",
        message: errorMessage,
    };
}