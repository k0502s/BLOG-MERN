import express from 'express';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from "../../config/index"
const { JWT_SECRET } = config;



//Model
import User from '../../models/user';

const router = express.Router()




//회원 정보 모두 가져오기

// @routes   Get api/user
// @desc     Get all user
// @access   Public

router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        if(!users) throw Error("No users");
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({msg: e.message});
    }
});




//회원 가입

// @routes   Post api/user
// @desc     Register user
// @access   Public

router.post('/', (req, res) => {
    console.log(req);
    const { name, email, password} = req.body;

    //Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: "모든 필드를 채워주세요" });
    }

    //Check for exisiting user
    User.findOne({email})
    .then((user) => {
        if(user) return res.status(400).json({msg: "이미 가입된 유저가 존재합니다"});
        const newUser = new User({
            name, email, password
        })

    //회원 정보 암호화 처리
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=> {
                    jwt.sign(
                        {id: user.id},
                        JWT_SECRET,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})


export default router;