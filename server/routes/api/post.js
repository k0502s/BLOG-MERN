import express from 'express';

//Model
import Post from '../../models/post'
import auth from "../../middleware/auth";

const router = express.Router() 

//api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find()
    console.log(postFindResult, "All Post Get")
    res.json(postFindResult)
})

router.post('/', auth, async(req, res, next) => {
    try{
        console.log(req, "req")
        const {title, contents, fileUrl, creator} = req.body
        const newPost = await Post.create({
            title: title, //키랑 값이 같아 하나로 통일 가능
            contents: contents,//
            fileUrl: fileUrl, //
            creator: creator //
        }); //.exec(); 대신 async await 사용한 것이다.
        res.json(newPost);
    } catch(e){
        console.log(e);
    }
});


export default router;
