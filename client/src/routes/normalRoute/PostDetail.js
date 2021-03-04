import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
    POST_DETAIL_LOADING_REQUEST,
    POST_DELETE_REQUEST,
    USER_LOADING_REQUEST,
  } from "../../redux/types";
import { Button, Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faCommentDots,
    faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig"; 
import Comments from "../../components/comments/Comments";

const PostDetail = (req) => {
    const dispatch = useDispatch()
    const { postDetail, creatorId, title, loading } = useSelector((state) => state.post)
    const { userId, userName } = useSelector((state) => state.auth);
    const { comments } = useSelector((state) => state.comment);

    console.log(req);
    useEffect(() => {
        dispatch({
          type: POST_DETAIL_LOADING_REQUEST,
          payload: req.match.params.id,
        });
        dispatch({
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token"),
          });
        }, [dispatch, req.match.params.id]);


        const onDeleteClick = () => {
            dispatch({
              type: POST_DELETE_REQUEST,
              payload: {
                id: req.match.params.id,
                token: localStorage.getItem("token"),
              },
            });
          };


          const EditButton = (
            <Fragment>
              <Row className="d-flex justify-content-center pb-3">
                <Col className="col-md-3 mr-md-3">
                  <Link to="/" className="btn btn-primary btn-block">
                    Home
                  </Link>
                </Col>
                <Col className="col-md-3 mr-md-3">
                  <Link
                    to={`/post/${req.match.params.id}/edit`}
                    className="btn btn-success btn-block"
                  >
                    Edit Post
                  </Link>
                </Col>
                <Col className="col-md-3">
                  <Button className="btn-block btn-danger" onClick={onDeleteClick}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </Fragment>
          );


          const HomeButton = (
            <Fragment>
              <Row className="d-flex justify-content-center pb-3">
                <Col className="col-sm-12 com-md-3">
                  <Link to="/" className="btn btn-primary btn-block">
                    Home
                  </Link>
                </Col>
              </Row>
            </Fragment>
          );

         const Body = (
             <>
             {userId === creatorId ? EditButton : HomeButton}
             <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
                {(() => {
                if (postDetail && postDetail.creator) {
                    return (
                    <Fragment>
                        <div className="font-weight-bold text-big">
                        <span className="mr-3">
                            <Button color="info">
                            {postDetail.category.categoryName}
                            </Button>
                        </span>
                        {postDetail.title}
                        </div>
                        <div className="align-self-end">{postDetail.creator.name}</div>
                    </Fragment>
                    );
                }
                })()}
            </Row>
            {postDetail && postDetail.comments ? (
              <Fragment>
                <div className="d-flex justify-content-end align-items-baseline small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                  &nbsp;
                  <span>{postDetail.date}</span>
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faCommentDots}/>
                  &nbsp;
                  <span>{postDetail.comments.length}</span>
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faMouse}/>
                  <span>{postDetail.views}</span>
                </div>
                <Row className="mb-3">
                  <CKEditor
                    editor={BalloonEditor} //ckeditor로 편집한 글도 ckditor 기능을 이용해 보여주어햐한다.
                    data={postDetail.contents}
                    config={editorConfiguration}
                    disabled="true" //보여주는 editor 글을 수정하지 못하도록 한다.
                  />
                  </Row>
                  <Row>
                    <Container className="mb-3 border border-blue rounded">
                      {/* Array.isArray()메서드는 인자가 Array인지 판별 */}
                      {Array.isArray(comments) ? comments.map(
                        ({contents, creator, date, _id, creatorName}) => (
                            <div key={_id}>
                              <Row className="justify-content-between p-2">
                                <div className="font-weight-bold">
                                    {creatorName ? creatorName : creator}
                                </div>
                                <div className="text-small">
                                  <span className="font-weight-bold">
                                  {/* //.split(" ")은 한 칸 나누기 위함 */}
                                    {date.split(" ")[0]}
                                    </span>
                                    <span className="font-weight-light">
                                      {" "}
                                  {/* split으로 쪼개고 난 두 번째 이기에 [1]이다 */}
                                      {date.split(" ")[1]}
                                    </span>
                                </div>
                              </Row>
                              <Row className="p-2">
                                <div>
                                  {contents}
                                </div>
                              </Row>
                              <hr />
                            </div>
                      )
                    ) : "로그인을 해주세요."}
                    <Comments
                      id={req.match.params.id}
                      userId={userId}
                      userName={userName}
                    />
                    </Container>
                </Row>
              </Fragment>
            ) : (
              <h1>게시글이 존재하지 않습니다.</h1>
            )}
             </>
         )

    return (
        <div>
            <Helmet title={`Post | ${title}`} />
            {loading === true ? GrowingSpinner : Body}
        </div>
    )
};

export default PostDetail;

