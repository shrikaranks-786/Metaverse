import { createClient } from "redis";

export const connectRedis = async ()=>{
    const redisClient = createClient();

    redisClient.on("error",(err)=>{
        console.log(err);
    })

    await redisClient.connect();
}