import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await response.json();
        setSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false);
      }
    };
    fetchTopSellers();
  }, []);

  const handleAuthorClick = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  if (loading) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              <ol className="author_list">
                {[...Array(12)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={50} height={15} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller) => (
                <li key={seller.authorId}>
                  <div
                    className="author_list_pp"
                    onClick={() => handleAuthorClick(seller.authorId)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="lazy pp-author author-image"
                      src={seller.authorImage}
                      alt={seller.authorName}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <span
                      onClick={() => handleAuthorClick(seller.authorId)}
                      style={{ cursor: "pointer" }}
                    >
                      {seller.authorName}
                    </span>
                    <span>{seller.price ? seller.price + " ETH" : ""}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
