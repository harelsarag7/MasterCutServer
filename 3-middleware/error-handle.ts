import { NextFunction, Request, Response } from "express";
import { ErrorModel } from "../4-models/ErrorModel";

export function catchAll(error: ErrorModel, req: Request, res: Response, next: NextFunction) {
    console.error(`[Vacations server log]: ERROR - ${error.message}, ${req.method} - ${req.url}`);
        res.status(error.code ?? 500).json({ errors: error.message });
    return;
}