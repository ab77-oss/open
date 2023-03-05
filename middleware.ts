import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export async function middleware(req:NextRequest, res:NextResponse){
    console.log("I m the middleware and i was called before the endpoint");

    const bearerToken = req.headers.get("authorization") as string;

    

    if(!bearerToken){
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}), {status:401}
        )
    }
    const token = bearerToken.split(" ")[1]
    
    if(!token){
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}), {status:401}
        )
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        await jose.jwtVerify(token, secret)
    } catch (error) {
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}), {status:401}
        )
    }
}

export const config = {
    matcher:["/api/auth/me"]
}