import React, { useRef, useState } from "react";
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
    const imgReview = useRef(null);
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
            imgReview.current.style.display = "block";
        };
        fileReader.readAsDataURL(fileToLoad);
    };
    const handleUpImage = async (e) => {
        showImgProduct(e.target.files[0]);
        let imgArr = [];
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "kpmcyaxr");
        formData.append("cloud_name", "df6mryfkp");
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/df6mryfkp/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await res.json();
        imgArr.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        setImage(imgArr[0].url);
    };
    const formik = useFormik({
        initialValues: {
            id: user.data.id,
            password: user.data.password,
            name: user.data.name,
            email: user.data.email,
            phone: user.data.phone,
            address: user.data.address,
            idRole: user.data.idRole,
            pathImg: user.data.pathImg
        },

        onSubmit: async (values) => {
            var _image = "";
            if (image) {
                _image = image;
            } else {
                _image = values.pathImg;
            }
            let data = { ...values, pathImg: _image };
            const respon = await dispatch(editProfileApi(data, token));
            if (respon.payload.data.status == 200) {
                toast.success("Sửa thông tin thành công!");
                navigate("/profile");
            } else {
                toast.success("Sửa thông tin thất bại!");
            }
        },
    });
    const { values, handleChange, handleSubmit } = formik;
    const styleImgReview = {
        display: values.pathImg ? "block" : "none",
        width: "240px",
    };
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Thông tin cá nhân</h5>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={values.pathImg}
                        alt="img_product"
                        ref={imgReview}
                        style={styleImgReview}
                    />
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    name="pathImg"
                                    accept=".jpg, .png"
                                    onChange={(event) => handleUpImage(event)}
                                />
                            </Form.Group>
                        </Col>
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
