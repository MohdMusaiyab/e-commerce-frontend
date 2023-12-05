import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
const Pagenotfound = () => {
  return (
    <div>
      <Layout title="Page Not Found ">
        <div className="pnf-div text-center">
          <h2>Page Not Found</h2>
          <h5>Error 404</h5>
          <Link to="/" className="btn btn-primary ">
            Click Here to Go Back
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Pagenotfound;
