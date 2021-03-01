import axios from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_LOADING_REQUEST,
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
} from "../types";


//All Posts load

const loadPostAPI = () => {
    return axios.get("/api/post");
  };
  
  function* loadPosts(action) {
    try {
      const result = yield call(loadPostAPI);
      console.log(result, "loadPosts");
      yield put({
        type: POSTS_LOADING_SUCCESS,
        payload: result.data,
      });
    } catch (e) {
      yield put({
        type: POSTS_LOADING_FAILURE,
        payload: e,
      });
    }
  }
  
  function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
  }



  export default function* postSaga() {
    yield all([
      fork(watchLoadPosts),
      
    ]);
  }