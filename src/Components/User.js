import React from "react";
import "./User.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [usersNumber, setUsersNumber] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [friendsData, setFriendsData] = useState([]);
  const [visitedUsers, setVisitedUsers] = useState(null);

  function handleScroll() {

    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPageNumber(pageNumber+1)
      
    }
  }
  window.addEventListener("scroll", handleScroll);



  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
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
        const newItem = {
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          prefix: data.prefix,
        };

        if (visitedUsers) {
          setVisitedUsers([...visitedUsers, newItem]);
        } else {
          setVisitedUsers([
            {
              id: data.id,
              name: data.name,
              lastName: data.lastName,
              prefix: data.prefix,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20}`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data1) => {
        const newData = { ...data1 };
        setFriendsData((prevData) => [...prevData, newData.list]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [pageNumber]);

  useEffect(() => {
    setFriendsData([])
    setPageNumber(1)
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20}`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data1) => {
        
        const newData = { ...data1 };
        setFriendsData((prevData) => [...prevData, newData.list]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]);


  return (
    <div className="user-page">
      {data ? (
        <div className="user-container">
          <div className="user-header">
            <div className="profile-picture">
              <img
                className="profile-picture-img"
                alt=""
                src={data.imageUrl + "?v=" + data.id}
              />
            </div>
            <div className="profile-info">
              <fieldset className="">
                <legend>Info</legend>
                <strong>
                  {data.prefix} {data.name} {data.lastName} <br />
                </strong>
                <div className="italic-description">{data.title}</div>
                <div>
                  <br />
                  <span className="span-info">Email: </span>
                  {data.email}
                </div>

                <div>
                  <span className="span-info">Ip Address: </span>
                  {data.ip}
                </div>

                <div>
                  <span className="span-info">Ip Address: </span>
                  {data.ip}
                </div>

                <div>
                  <span className="span-info">Job Area: </span>
                  {data.jobArea}
                </div>

                <div>
                  <span className="span-info">Job Type: </span>
                  {data.jobType}
                </div>
              </fieldset>
            </div>
            <div className="profile-adress">
              <fieldset className="">
                <legend>Address</legend>
                <strong>
                  {data.company.name} {data.company.suffix}
                </strong>
                <div>
                  <span className="span-info">City: </span>
                  {data.address.city}
                </div>
                <div>
                  <span className="span-info">Country: </span>
                  {data.address.country}
                </div>
                <div>
                  <span className="span-info">State: </span>
                  {data.address.state}
                </div>
                <div>
                  <span className="span-info">Street Address: </span>
                  {data.address.streetAddress}
                </div>
                <div>
                  <span className="span-info">ZIP: </span>
                  {data.address.zipCode}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="users-path-container">
            {visitedUsers ? (
              <div className="users-path">
                {visitedUsers.map((item) => (
                  <Link to={`/user/${item.id}`} >
                    <div>
                      {" "}
                      {item.prefix} {item.name} {item.lastName} {">"}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="friends">
            <h1>Friends: </h1>
            <br />
            <div className="users-friends">
              {friendsData ? (
                <div className="profile-container">
                  {friendsData.map((item) =>
                    item.map((insideItem) => <Profile item={insideItem} />)
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
