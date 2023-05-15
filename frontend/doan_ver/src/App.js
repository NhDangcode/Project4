import "./App.css";
import LayoutUserSide from "./Layout/LayoutUserSide";
import HomeAdmin from "./adminSide/HomeAdmin";
import { Progress } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
    const loading = useSelector((state) => state.user.status);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <>
            {loading === "loading" ? (
                <Progress animated value="100" className="progress"></Progress>
            ) : (
                ""
            )}

            {currentUser !== null ? (
                currentUser.role === "Guest" ? (
                    <LayoutUserSide />
                ) : (
                    <HomeAdmin />
                )
            ) : (
                <LayoutUserSide />
            )}
        </>
    );
}

export default App;
