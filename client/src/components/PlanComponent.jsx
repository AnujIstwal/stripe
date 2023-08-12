import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanComponent = () => {
    const [plan, setPlan] = useState({
        price: 100,
        quality: "Good",
        resolution: "480p",
        devices: ["Phone", "Tablet"],
    });
    const [plantype, setPlanType] = useState([100, 200, 500, 700]);
    const [classstatus, setClassstatus] = useState(["on", "off", "off", "off"]);
    const [toogle, setToogle] = useState(["on", "off"]);

    const ToogleAmount = (type) => {
        if (type == "monthly") {
            setPlanType([100, 200, 500, 700]);
        } else {
            setPlanType([1000, 2000, 5000, 7000]);
        }
    };

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(["Basic", "Monthly", "Rs 200/mo"]),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading("Redirecting...");

        stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <>
            <div className="flex-container">
                <div className="col1 col-flex">
                    <div className="head-box">
                        <div className="outer-butt">
                            <button
                                className={toogle[0] + " inner-butt"}
                                onClick={() => {
                                    ToogleAmount("monthly");
                                    setToogle(["on", "off"]);
                                }}
                            >
                                Monthly
                            </button>
                            <button
                                className={toogle[1] + " inner-butt"}
                                onClick={() => {
                                    ToogleAmount("yearly");
                                    setToogle(["off", "on"]);
                                }}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>

                    <label>Monthly Price</label>
                    <label>Video Quality</label>
                    <label>Resolution</label>
                    <label>Device you can use to watch</label>
                </div>
                <div
                    className={classstatus[0] + " col-flex"}
                    onClick={() => setClassstatus(["on", "off", "off", "off"])}
                >
                    <div className="head-box">
                        <button className="main-plan">
                            <span>Mobile</span>
                        </button>
                    </div>
                    <label>Rs {plantype[0]}</label>
                    <label>Good</label>
                    <label>480p</label>
                    <div className="devices-list">
                        <label>Phone</label>
                        <label>Tablet</label>
                    </div>
                </div>
                <div
                    className={classstatus[1] + " col-flex"}
                    onClick={() => setClassstatus(["off", "on", "off", "off"])}
                >
                    <div className="head-box">
                        <button className="main-plan">
                            <span>Basic</span>
                        </button>
                    </div>
                    <label>Rs {plantype[1]}</label>
                    <label>Good</label>
                    <label>480p</label>
                    <div className="devices-list">
                        <label>Phone</label>
                        <label>Tablet</label>
                        <label>Computer</label>
                        <label>TV</label>
                    </div>
                </div>
                <div
                    className={classstatus[2] + " col-flex"}
                    onClick={() => setClassstatus(["off", "off", "on", "off"])}
                >
                    <div className="head-box">
                        <button className="main-plan">
                            <span>Standard</span>
                        </button>
                    </div>
                    <label>Rs {plantype[2]}</label>
                    <label>Better</label>
                    <label>1080p</label>
                    <div className="devices-list">
                        <label>Phone</label>
                        <label>Tablet</label>
                        <label>Computer</label>
                        <label>TV</label>
                    </div>
                </div>
                <div
                    className={classstatus[3] + " col-flex"}
                    onClick={() => setClassstatus(["off", "off", "off", "on"])}
                >
                    <div className="head-box">
                        <button className="main-plan">
                            <span>Premium</span>
                        </button>
                    </div>
                    <label>Rs {plantype[3]}</label>
                    <label>Best</label>
                    <label>4k+HDR</label>
                    <div className="devices-list">
                        <label>Phone</label>
                        <label>Tablet</label>
                        <label>Computer</label>
                        <label>TV</label>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="main-next-butt"
                onClick={handleCheckout}
            >
                Next
            </button>
        </>
    );
};

export default PlanComponent;
