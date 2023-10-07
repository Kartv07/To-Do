import connectDB from "@/libs/connectDB";
import Feeds from "@/models/Feeds";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: any) {
    const id = req.nextUrl.searchParams.get('id');
    
    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ msg: "Invalid ObjectId" }, { status: 400 });
    }

    await connectDB();

    try {
        const result = await Feeds.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ msg: "No feeds found to delete" }, { status: 404 });
        }
        return NextResponse.json({ msg: "Deleted Successfully !" });
    } catch (error) {
        return NextResponse.json({ msg: "Error occurred while deleting", error }, { status: 500 });
    }
}
