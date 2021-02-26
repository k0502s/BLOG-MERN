import React, { useEffect } from 'react';
import { USER_LOADING_REQUEST } from '../redux/types';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let auth = useSelector(state => state.auth);
        // let router = useSelector(state => state.router);
        
        const { isAuthenticated, userRole2 } = useSelector(state => state.auth);
        const dispatch = useDispatch();

         useEffect(() => {
            dispatch({
                type: USER_LOADING_REQUEST,
                payload: localStorage.getItem("token"),
              });
              if (!isAuthenticated) { //로그아웃시 통과
                     if (option) { //Auth(foot, true)면 통과
                     props.history.push('/')
                         }
                            //Loggined in Status 
                        } else {
                            //supposed to be Admin page, but not admin person wants to go inside
                            if (adminRoute && userRole2) {
                                props.history.push('/')
                            }
                            //Logged in Status, but Try to go into log in page 
                            else {
                                if (option === false) {
                                    props.history.push('/')
                                }
                            }
                        }
            }, [dispatch])
        //     
        //     dispatch(auth()).then(response => {
        //         //Not Loggined in Status 
        //         if (!isAuthenticated) {
        //             if (option) {
        //                 props.history.push('/login')
        //             }
        //             //Loggined in Status 
        //         } else {
        //             //supposed to be Admin page, but not admin person wants to go inside
        //             if (adminRoute && isAdmin) {
        //                 props.history.push('/')
        //             }
        //             //Logged in Status, but Try to go into log in page 
        //             else {
        //                 if (option === false) {
        //                     props.history.push('/')
        //                 }
        //             }
        //         }
        //     })

        // 

        return (
            <SpecificComponent {...props} auth={auth}/>
        )
    }
    return AuthenticationCheck
}