import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import * as jose from "jose"
import { setCookie } from "cookies-next";

// validation the user input

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest,res:NextApiResponse){
   if ( req.method==="POST"){

    const {firstName, lastName, email, phone, city, password}= req.body;
    const errors: string[]=[]
    const validationSchema = [
        {
            valid:validator.isLength(firstName, {
                min:1,
                max:20
            }),
            errorMessage:"First name is Invalid"
        },
        {
            valid:validator.isLength(lastName, {
                min:1,
                max:20
            }),
            errorMessage:"Last name is Invalid"
        },
        {
            valid:validator.isEmail(email),
            errorMessage:"Email is Invalid"
        },
        {
            valid:validator.isMobilePhone(phone),
            errorMessage:"Phone number is Invalid"
        },
        {
            valid:validator.isLength(city, {min:1}),
            errorMessage:"City is Invalid"
        },
        {
            valid:validator.isStrongPassword(password),
            errorMessage:"Your password is weak"
        },
    ];

    validationSchema.forEach((check) => {
        if(!check.valid){
        errors.push(check.errorMessage)
        }
    });
    if(errors.length){
        return res.status(400).json({errorMessage:errors[0]});
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if(userWithEmail){
        return res
            .status(400)
            .json({errorMessage:"Email is associated with another account"});
    }
// hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
// creating the user
    const user = await prisma.user.create({
        data:{
            first_name:firstName,
            last_name:lastName,
            password:hashedPassword,
            city,
            phone,
            email,
        },
    });

// Creating the token
    const alg="HS256"
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const  token = await new jose.SignJWT({email:user.email})
        .setProtectedHeader({alg})
        .setExpirationTime("24h")
        .sign(secret);
        
        setCookie("jwt", token, {req,res, maxAge:60*6*24})

        return res.status(200).json({
            firstName:user.first_name,
            lastName:user.last_name,
            email:user.email,
            phone:user.phone,
            city:user.city
    
    
        });
   }

   return res.status(404).json("Unknown endpoint")
}

