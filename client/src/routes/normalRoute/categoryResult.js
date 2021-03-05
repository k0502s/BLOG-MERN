import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostcardOne";
import { Row } from "reactstrap";

const CategoryResult = () => {
  const dispatch = useDispatch();
  let { categoryName } = useParams(); //useParams는 주소 params을 따로 떼어오는 기능
  const { categoryFindResult } = useSelector((state) => state.post);

  console.log(categoryFindResult);
  console.log(categoryName);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  return (
    <div>
      <h1>Category: "{categoryName}"</h1>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} />
      </Row>
    </div>
  );
};

export default CategoryResult;