import React, { Fragment, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { POSTS_LOADING_REQUEST } from '../../redux/types'
import { Helmet } from "react-helmet";
import { Row, Alert } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne"
import Category from '../../components/post/Category'


const PostCardList = () => {

    const { posts, categoryFindResult, loading, postCount } = useSelector((state) => state.post)
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch({
           type: POSTS_LOADING_REQUEST, payload: 0
       })
    }, [dispatch])

    //////////////////////////////////////////

    const skipNumberRef = useRef(0);
    const postCountRef = useRef(0);
    const endMsg = useRef(false);

    postCountRef.current = postCount - 6;

    const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    const [visible, setVisible] = useState(false);

    useEffect(() => {           //IntersectionObserver는 기능을 담은 콜백함수 메소드
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
              type: POSTS_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
            console.log(endMsg.current);
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef, visible];
  };

    

    const [lastPostElementRef, visible] = useOnScreen({
        threshold: "0.5", //threshold는 페이지 확대 축소에 따른 픽셀 반응 변화가 달라 작동이 안될 것을 방지
      });
      console.log(visible, "visible", skipNumberRef.current, "skipNum");

        ////////////////////////////////////////////

    return (
        <Fragment>
            <Helmet title='Home' />
            <Row className="border-bottom border-top border-primary py-2 mb-3">
                <Category posts={categoryFindResult} />
            </Row>
            <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
            <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
                {loading ? (
                    ""
                ) : endMsg ? (
                    <div>
                    <Alert color="danger" className="text-center font-weight-bolder">
                        더 이상의 포스트는 없습니다
                    </Alert>
                    </div>
                ) : ("")}
        </Fragment>
    );
};

export default PostCardList

