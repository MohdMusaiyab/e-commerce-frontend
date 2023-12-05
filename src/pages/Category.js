import React from 'react';
import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Category = () => {
  const categories = useCategory();

  return (
    <Layout title={'All Categories'}>
      <div className="container mt-4">
        <h1>All Categories</h1>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mb-4" key={c._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{c?.name}</h5>
                  <Link to={`/category/${c.slug}`} className="btn btn-info">
                    Explore {c?.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
