import Feeds from "@/models/Feeds";
import connectDB from "@/libs/connectDB";
import { NextResponse } from "next/server";

export async function POST(req:any){
    await connectDB();
    const {user, title, description} = await req.json();
    const feed = await Feeds.findOne({title:title, user : user});
    if(feed) return NextResponse.json({msg:"This title already exist", status : 202});
    const newFeed = new Feeds({user : user, title:title, description:description});
    await Feeds.create(newFeed);
    return NextResponse.json({msg:"Added Successfully !", status : 200});

}