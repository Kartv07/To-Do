import mongoose, {Schema} from "mongoose";

const FeedSchema = new Schema({
    user : String,
    title : String,
    description : String,
});

const Feeds = mongoose.models.Feeds || mongoose.model("Feeds", FeedSchema);

export default Feeds;