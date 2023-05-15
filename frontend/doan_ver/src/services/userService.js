import requestApi from "../utils/requestApi";

export const editProfileService = (userEdit, token) => {
    return requestApi({
        method: "put",
        url: `user/edit`,
        headers: {
            "Content-Type": "application/json",
            // Authorization: token,
        },
        data: JSON.stringify(userEdit)
    });
};

export const uploadAvatarService = (idUser, formData) => {
    return requestApi({
        method: "put",
        url: `user/upload-avatar/${idUser}`,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: formData
    });
};


export const getInforUserService = () => {
    return requestApi({
        method: "get",
        url: `user/get_infor`,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },

    });
};
export const getAllUserService = () => {
    return requestApi({
        method: "get",
        url: `user/all`,
        headers: {
            //Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },

    });
};

