import requestApi from "../utils/requestApi";

export const loginServices = async (dataLogin) => {
    try {
        const respone = await requestApi({
            method: "post",
            url: "user/login",
            data: JSON.stringify(dataLogin),
        });
        console.log(respone);
        return respone;
    } catch (error) {
        return error;
    }
};


export const getCurrentUser = async (accessToken) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: "user/get_infor",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        return respone
    } catch (error) {
        return error
    }
}