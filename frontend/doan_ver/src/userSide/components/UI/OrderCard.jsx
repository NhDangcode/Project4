import React from "react";
import {
    Card,
    Container,
    Row,
    CardTitle,
    CardBody,
    CardText,
    Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/order-card.css";
import { VND } from "../../../utils/convertVND";
const OrderCard = (props) => {
    const { item } = props;
    const date = new Date(item.createAt);
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/order/${item.id}`);
    };
    return (
        <>
            <Container>
                <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                    Danh sách lịch sử mua hàng
                </h2>
                <Card className="card__container">
                    <CardTitle className="card__title">
                        Đơn hàng được tạo lúc:{" "}
                        <span>{date.toLocaleString()}</span>
                    </CardTitle>
                    <CardBody>
                        <Row>
                            <Col md={8}>
                                <CardText>
                                    Số điện thoại: <span>{user?.phone}</span>
                                </CardText>
                                <CardText>
                                    Địa chỉ: <span>{user?.address}</span>
                                </CardText>
                            </Col>
                            <Col md={4} className="drop__detail">
                                <CardText>
                                    Tổng tiền:{" "}
                                    <span>{VND.format(item?.total)}</span>
                                </CardText>
                                <button
                                    className="buy__btn detail__btn"
                                    onClick={handleClick}
                                >
                                    Chi tiết
                                </button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default OrderCard;
