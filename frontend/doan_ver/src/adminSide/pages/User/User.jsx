import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../../../services/productService";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
import { getAllUserService } from "../../../services/userService";
export default function User() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const result = await getAllUserService();
            if (result.data.status === 200) {
                setUsers(result.data.data);
            }
        };
        fetchUser();
    }, []);
    const onDelete = async (id) => {
        const result = await deleteProduct(id);
        if (result.status === 200) {
            toast.success("Xóa thành công!");
            await dispatch(getAllProductsApi());
            navigate("/admin/products");
        } else {
            toast.error("Xóa thất bại!");
        }
    };
    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Tên tài khoản",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Ngày tạo",
            key: "createAt",
            dataIndex: "createAt",
            render: (value) => {
                var date = new Date(value);
                return <>{date.toLocaleDateString()}</>;
            },
        },

        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => {
                            navigate(`/admin/user/edit/${record.id}`, {
                                state: record,
                            });
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => onDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </>
            ),
        },
    ];
    const rows = users.length > 0 ? users : [];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "50px",
                }}
            >
                <h2>Danh sách tài khoản</h2>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/product/add");
                    }}
                >
                    Thêm tài khoản
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
