import mongoose from 'mongoose';
import moment from 'moment';

//Create Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true //검색의 원활을 위함
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: -2, //작성하는 사람 조회 뺴기 위함
    },
    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm")
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});



const Post = mongoose.model("post", PostSchema);

export default Post;