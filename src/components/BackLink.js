import React from "react";
import { Route, Link } from "react-router-dom";
import Elements from "./Elements";

const BackLink = () => {
  return (
    <div>
      <Link className="element-link" to="/">
        Back
      </Link>
      <Route path="/" exact component={Elements} />
    </div>
  );
};

export default BackLink;
