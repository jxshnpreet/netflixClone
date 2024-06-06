"use server"
import prisma from "../utils/db";

export default async function postData(d:any){
    prisma.movie.create({
        data:d
    }).then(res=>{
        console.log('====================================');
        console.log("res", res);
        console.log('====================================');
    }).catch(e=>{
        console.log('====================================');
        console.log("err", e);
        console.log('====================================');
    })
}