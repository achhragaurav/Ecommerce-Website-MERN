import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"
import {publicRequest, userRequest}from "../requestMethods"
import {updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure } from "./productRedux";

    import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure } from "./allUsersRedux";

export const login = async(dispatch, user) =>{
dispatch(loginStart());
try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
    return response.data
} catch (error) {
    dispatch(loginFailure())
}
}


export const getProducts = async(dispatch) =>{
    dispatch(getProductStart());
    try {
        const response = await publicRequest.get("/products");
        console.log(response);
        dispatch(getProductSuccess(response.data));
        return response.data
    } catch (error) {
        dispatch(getProductFailure())
    }
    }

export const getSingleProduct = async(id) =>{
    try {
        const response = await publicRequest.get(`/products/find/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

    export const deleteProduct = async(id, dispatch) =>{
    dispatch(deleteProductStart());
    try {
        const response = await userRequest.delete(`/products/${id}`);
        console.log(response);

        dispatch(deleteProductSuccess(
            response.data
            ));
        console.log(response.data);
        return response.data
    } catch (error) {
        dispatch(deleteProductFailure())
    }
    }


    export const updateProduct = async(id, product, dispatch) =>{
        dispatch(updateProductStart());
        try {
            const response = await userRequest.put(`/products/${id}`,product);
            console.log(response);
            dispatch(updateProductSuccess({id: id, product: response.data}));
            return response
        } catch (error) {
            dispatch(updateProductFailure())
        }
        }

        export const addProduct = async(product, dispatch) =>{
            dispatch(addProductStart());
            try {
                const response = await userRequest.post(`/products`,product);
                dispatch(addProductSuccess(response.data));
            } catch (error) {
                dispatch(addProductFailure())
            }
            }

            export const getUsers = async(dispatch) =>{
                dispatch(getUsersStart());
                try {
                    const response = await userRequest.get("/user");
                    console.log(response);
                    dispatch(getUsersSuccess(response.data));
                    return response.data
                } catch (error) {
                    dispatch(getUsersFailure())
                }
                }
            
            export const getSingleUser = async(id) =>{
                try {
                    const response = await publicRequest.get(`/user/find/${id}`);
                    return response.data
                } catch (error) {
                    console.log(error);
                }
            }
            
                export const deleteUser = async(id, dispatch) =>{
                dispatch(deleteUserStart());
                try {
                    const response = await userRequest.delete(`/user/${id}`);
                    console.log(response);
                    dispatch(deleteUserSuccess(response.data));
                    // console.log({id:id,...response.data});
                    return response.data
                } catch (error) {
                    dispatch(deleteUserFailure())
                }
                }
            
            
                export const updateUser = async(id, user, dispatch) =>{
                    dispatch(updateUserStart());
                    try {
                        const response = await userRequest.put(`/user/${id}`,user);
                        console.log(response);
                        dispatch(updateUserSuccess({...response.data}));
                        return response
                    } catch (error) {
                        dispatch(updateUserFailure())
                    }
                    }
            
                    export const addUser = async(user, dispatch) =>{
                        dispatch(addUserStart());
                        try {
                            const response = await userRequest.post(`/auth/register`,user);
                            dispatch(addUserSuccess(response.data));
                        } catch (error) {
                            dispatch(addUserFailure())
                        }
                        }

                    export const getUserStats = async() =>{
                       try {
                            const response = await userRequest.get(`user/stats`);
                            console.log(response);
                            return response.data
                        } catch (error) {
                            console.log(error);
                        }
                    }

            export const logoutUser = (dispatch) =>{
                dispatch(logout())
                window.location.reload();
            }