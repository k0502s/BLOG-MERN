import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
  } from "../types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    userRole2:"",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true,
            }
            case LOGIN_SUCCESS:
                localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                userRole2: action.payload.role2,
                errorMsg: "",
            };
            case LOGOUT_SUCCESS:
                localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                userRole2: null,
                errorMsg: "",
            };

            case LOGOUT_FAILURE:
            case LOGIN_FAILURE:
                localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                userRole2: null,
                errorMsg: action.payload.data.msg,
            }
            
            case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null
                
            }
            case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null
            };
            case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: null
            };
            case USER_LOADING_REQUEST:
                return {
                  ...state,
                  isLoading: true,
                };

            case USER_LOADING_SUCCESS:
                return {
                  ...state,
                  userRole2: action.payload.role2 === 0 ? false : true,
                  isAuthenticated: true,
                  isLoading: false,
                  user: action.payload,
                  userId: action.payload._id,
                  userName: action.payload.name,
                  userRole: action.payload.role,
                };
              case USER_LOADING_FAILURE:
                return {
                  ...state,
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  userRole: "",
                };
            default:
                return state;             
    }
};

export default authReducer;
