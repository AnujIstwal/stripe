import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import PlanComponent from "../components/PlanComponent";

const Home = () => {
    const { user } = useContext(UserContext);
    const { plan, setPlan } = useState("monthly");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="bg-white">
            <div className="plans-table">
                <h2>Choose the right plan for you </h2>
                <PlanComponent />
            </div>
        </div>
    );
};

export default Home;
