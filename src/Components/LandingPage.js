import React from "react";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import "./LandingPage.css";
// import { Link } from "react-router-dom";

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/20}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data1) => {
        const newData = { ...data1 };
        setData((prevData) => [...prevData, newData.list]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [pageNumber]);

  return (
    <div className="landing-container">
      <div className="landing" onScroll={handleScroll}>
        {data ? (
          <div className="profile-container">
            {data.map((item) =>
              item.map((insideItem) => <Profile item={insideItem} />)
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
