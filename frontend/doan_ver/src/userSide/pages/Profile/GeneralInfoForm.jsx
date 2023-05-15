import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfileApi } from "../../../redux/slices/userSlice";

export const GeneralInfoForm = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            id: user.data.id,
            password: user.data.password,
            name: user.data.name,
            email: user.data.email,
            phone: user.data.phone,
            address: user.data.address,
            idRole: user.data.idRole,
        },

        onSubmit: async (values) => {
            const respon = await dispatch(editProfileApi(values, token));
            if (respon.payload.data.status == 200) {
                toast.success("Sửa thông tin thành công!");
                navigate("/profile");
            } else {
                toast.success("Sửa thông tin thất bại!");
            }
        },
    });

    const { values, handleChange, handleSubmit } = formik;

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Thông tin cá nhân</h5>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="name@company.com"
                                    value={values.email}
                                    disabled
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="name">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="09684883343"
                                    value={values.phone}
                                    name="phone"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    value={values.address}
                                    name="address"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ backgroundColor: "#0a1d37" }}
                        >
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
