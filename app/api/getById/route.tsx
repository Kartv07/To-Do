import connectDB from "@/libs/connectDB";
import Feeds from "@/models/Feeds";
import { NextResponse } from "next/server";

export async function GET(req:any){
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        const response = await Feeds.findOne({_id : id});
        return NextResponse.json({response});
    } catch (error) {
        return NextResponse.json({error : "Fetching Problem occur !"});
    }
   
}