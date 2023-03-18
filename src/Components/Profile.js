import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile(props) {

  return (
    <div className="profile" id={props.item.id}>
      <Link className="link" to={`/user/${props.item.id}`}>
        <div className="profile-content">
          <img
            alt="profilePicture"
            className="profile-img"
            src={props.item.imageUrl + "?v=" + props.item.id}
          />
          <div className="profile-description">
            <strong>
              {props.item.prefix} {props.item.name} {props.item.lastName}
            </strong>
          </div>
          <div className="profile-description">{props.item.title}</div>
        </div>
      </Link>
    </div>
  );
}
