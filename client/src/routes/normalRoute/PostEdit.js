import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";
import { POST_EDIT_UPLOADING_REQUEST } from "../../redux/types";



const PostEdit = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [form, setValues] = useState({
        title: "",
        contents: "",
        fileurl: ""
    })
    const { postDetail } = useSelector((state) => state.post)
    const dispatch = useDispatch()


    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
      setValues({
        title: postDetail.title,
        contents: postDetail.contents,
        fileUrl: postDetail.fileUrl,
      });
    }, [postDetail.title, postDetail.contents, postDetail.fileUrl]);


    const getDataFromCKEditor = (event, editor) => {
        const data = editor.getData() //CKEditor에서 제공하는 데이터 뽑기 메소드 getData()
        console.log(data)
        if(data && data.match("<img src=")){
            const whereImg_start = data.indexOf("<img src=") //<img sec=가 들어가 있는 index  값 추출
            //예: <img src="https://jinseokproject1.s3.ap-northeast-2.amazonaws.com/upload/%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C1614655588791.png">
            console.log(whereImg_start)
            let whereImg_end = ""
            let ext_name_find = ""
            let result_Img_Url = ""
            const ext_name = ["jpeg", "png", "jpg", "gif"] //확장자 종류를 담은 배열

            for (let i = 0; i < ext_name.length; i++) {
                if (data.match(ext_name[i])) { //확장자 찾기 위해 배열 안에서 돈다.
                  console.log(data.indexOf(`${ext_name[i]}`));
                  ext_name_find = ext_name[i]; //찾은 확장자 ext_name_find 변수에 일일이 선언
                  whereImg_end = data.indexOf(`${ext_name[i]}`);//찾은 확장자 명의 위치 index값을 whereImg_end에 일일이 변수화
                }
              }
              console.log(ext_name_find);
              console.log(whereImg_end);

              //끝부분 확장자만 잘라 Url 만들기
              if (ext_name_find === "jpeg") {
                  //확장자가 jpeg라 하면 substring 메소드를 이용하여 jpeg 확장자를 잘라준다.
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
              } else {
                  //나머지 확장자는 3글자 이므로 아래의 코드로 처리해서 똑같이 확장자 잘라준다.
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
              }
        
              console.log(result_Img_Url, "result_Img_Url");
              setValues({
                ...form,
                fileUrl: result_Img_Url,
                contents: data,
              });
            } else {
              setValues({
                ...form,
                fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,//이미지 안올리면 썸내일 기본 이미지 설정하는 곳
                contents: data,
              });
        }
    };


    const onSubmit = async (e) => {
        await e.preventDefault();
        const { title, contents, fileUrl } = form;
        const token = localStorage.getItem("token");
        const id = postDetail._id
        const body = { title, contents, fileUrl, token, id };
        dispatch({
          type: POST_EDIT_UPLOADING_REQUEST,
          payload: body
        });
      };


    return (
        <div>
            {isAuthenticated ? (
                <Form onSubmit={onSubmit}>
                    <FormGroup className='mb-3'>
                        <Label for="title">Title</Label>
                        <Input
                        defaultValue={postDetail.title} //초기값 설정
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                    <Label for="content">Content</Label>
                    <CKEditor
                        data={postDetail.contents}
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        onInit={Myinit}
                        onBlur={getDataFromCKEditor} //onBlur가 onChange, onClike 보다 렉이 덜 발생한다.
                    />
                    <Button
                        color="success"
                        block
                        className="mt-3 col-md-2 offset-md-10 mb-3"
                    >
                        제출하기
                    </Button>
                    </FormGroup>
                </Form>
            ) : (
                <Col width={50} className="p-5 m-5">
                <Progress animated color="info" value={100} />
                </Col>
            )}
            </div>
        );
        };

export default PostEdit;
