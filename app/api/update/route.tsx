// {
//       "id": "651463ab99670e7ced1f4098",
//       "title": "Update",
//       "description" : "Hello My name is Kartavya Panthi !"
//     }

import connectDB from "@/libs/connectDB";
import Feeds from "@/models/Feeds";
import { NextResponse } from "next/server";

export async function PUT(req:any){
    try {
        await connectDB();
        const {id, title, description, user} = await req.json();
        const response = await Feeds.updateOne({_id: id}, { $set: { title, description, user }});
        return NextResponse.json({msg : "updated Successfully "});
    } catch (error) {
        return NextResponse.json({error : "Fetching Problem occur !"});
    }
   
}