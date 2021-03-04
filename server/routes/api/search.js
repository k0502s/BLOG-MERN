import express from "express";
const router = express.Router();

import Post from "../../models/post";

router.get("/:searchTerm", async (req, res, next) => {
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.searchTerm,
        $options: "i", //"i"는 덜 민감하게 즉 대문자 소문자 구별 없이 검색하라는 뜻
      },
    });
    console.log(result, "Search result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;