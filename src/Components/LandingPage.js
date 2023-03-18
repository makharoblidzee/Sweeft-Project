import React from "react";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(20);
 

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPageNumber(pageNumber + 20);
    }

    console.log("5");
  };

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/${pageNumber}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const newData = { ...data };
        setData(newData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [pageNumber]);
  console.log(data);

  return (
    <div className="container">
      {/* <button onClick={HandleClick}>levaniko kai bichia</button> */}
      <div className="imusahvera" onScroll={handleScroll}>
        {data ? (
          <div>
            {data.list.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          "none"
        )}
      </div>
    </div>
  );
}
