import requestApi from "../utils/requestApi";

export const getAllCategoryServices = async () => {
    try {
        const respone = await requestApi({
            url: "category/all",
            method: "get",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
