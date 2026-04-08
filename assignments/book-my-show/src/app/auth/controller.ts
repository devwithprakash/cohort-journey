import type { Request, Response } from "express"
import { registerPayload } from "./dto/register.dto"

const register = async (req:Request, res: Response)=>{
    const validateResult = await registerPayload.safeParseAsync(req.body)

    if(validateResult.error){
        
    }
}