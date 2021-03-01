import mongoose from 'mongoose';
import moment from 'moment';


//Create Schema
const CommentSchema = new mongoose.Schema({
    conetents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm"),
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creatorName: { type: String },
});


const Comment = mongoose.model("comment", CommentSchema);

export default Comment;