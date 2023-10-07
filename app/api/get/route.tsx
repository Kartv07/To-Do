import connectDB from "@/libs/connectDB";
import Feeds from "@/models/Feeds";
import { NextResponse } from "next/server";

export async function GET(req:any){
    try {
    const user = req.nextUrl.searchParams.get('user');

        await connectDB();
        const response = await Feeds.find({user : user});
        return NextResponse.json({response});
    } catch (error) {
        return NextResponse.json({error : "Fetching Problem occur !"});
    }
   
}