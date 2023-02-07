import React from "react";
import "./Card.css";

interface cardProps {
  name: string;
  height: number;
  weight: number;
  location: string;
}

const Card = (props: cardProps) => {
  return (
    <div className="grid">
      <h4>
        <b>{props.name}</b>
      </h4>
      <p>Height : {props.height}</p>
      <p>Weight : {props.weight}</p>
      <p>Location : {props.location}</p>
    </div>
  );
};

export default Card;
