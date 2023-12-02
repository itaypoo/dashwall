import {NextApiResponse} from "next";

export class ApiError extends Error {
    code: number
    constructor(code: number, message: string) {
        super(message)
        this.code = code
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

// Processes an API call with error handling and returns whether it was successful or not. Use ApiError to throw errors.
export async function processApiCall(res: NextApiResponse, execute: () => Promise<void>) {
    try {
        await execute()
        return true
    } catch (error) {
        console.error("Api Error: " + error)
        if(error instanceof Error) {
            console.error("stack:" + error.stack)
        }
        if (error instanceof ApiError)
            res.status(error.code).send(error.message)
        else res.status(500).send("Unknown error")
        return false
    }
}