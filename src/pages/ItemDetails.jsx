import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };
    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center" data-aos="fade-up">
                  <Skeleton width="100%" height={400} />
                </div>
                <div className="col-md-6" data-aos="fade-in">
                  <div className="item_info">
                    <Skeleton width="60%" height={40} />
                    <div className="item_info_counts d-flex">
                      <Skeleton width={50} height={20} style={{ marginRight: 10 }} />
                      <Skeleton width={50} height={20} />
                    </div>
                    <Skeleton width="100%" height={80} />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author d-flex align-items-center">
                          <Skeleton width={50} height={50} borderRadius="50%" />
                          <Skeleton width={100} height={20} style={{ marginLeft: 10 }} />
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author d-flex align-items-center">
                          <Skeleton width={50} height={50} borderRadius="50%" />
                          <Skeleton width={100} height={20} style={{ marginLeft: 10 }} />
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price d-flex align-items-center">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={50} height={20} style={{ marginLeft: 10 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return <div>No item found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-up">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6" data-aos="fade-in">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts d-flex">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author d-flex align-items-center">
                        <a href={`/author/${item.ownerId}`}>
                          <img
                            className="lazy"
                            src={item.ownerImage}
                            alt={item.ownerName}
                          />
                          <i className="fa fa-check"></i>
                        </a>
                        <a href={`/author/${item.ownerId}`} style={{ marginLeft: 10 }}>
                          {item.ownerName}
                        </a>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author d-flex align-items-center">
                        <a href={`/author/${item.creatorId}`}>
                          <img
                            className="lazy"
                            src={item.creatorImage}
                            alt={item.creatorName}
                          />
                          <i className="fa fa-check"></i>
                        </a>
                        <a href={`/author/${item.creatorId}`} style={{ marginLeft: 10 }}>
                          {item.creatorName}
                        </a>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price d-flex align-items-center">
                      <img src={EthImage} alt="ETH" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
