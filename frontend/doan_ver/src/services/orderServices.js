import requestApi from "../utils/requestApi";

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("currentUser"))?.data;

export const createOrderService = async () => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/confirm?idUser=${user.id}&status=1`,
            headers: {
                // Authorization: token,
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderAnUserService = async () => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/getAllOrder?idUser=${user.id}`,
            headers: {
                //Authorization: "Bearer " + `${accessToken}`,
            },
        });
        return respone;
    } catch (error) {
        return error;
    }
};
export const deleteOrder = async (id) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `order/delete`,
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
                //Authorization: JSON.parse(localStorage.getItem("token")),
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const getDetailsOrderService = async (dataOrderDetail) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/detail/getAllByOrder?idOrder=${dataOrderDetail}`,
            headers: {
                //Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderService = () => {
    return requestApi({
        method: "get",
        url: `order/all`,
    });
};


export const changeStatusOrderService = (idOrder) => {
    return requestApi({
        method: "get",
        url: `order/confirmOrder?idOrder=${idOrder}&status=2`,
        headers: {
            //Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
    });
}
