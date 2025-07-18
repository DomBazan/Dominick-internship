import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HotCollectionsSlider.css";

const SkeletonSlide = () => (
  <div className="slide skeleton">
    <div className="nft_coll">
      <div className="nft_wrap skeleton-box"></div>
      <div className="nft_coll_pp skeleton-circle"></div>
      <div className="nft_coll_info">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  </div>
);

const HotCollectionsSlider = () => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollectionsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const slidesToShow = 4;

  // Get 4 items starting from currentIndex, wrapping around if needed
  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      visibleSlides.push(collectionsData[(currentIndex + i) % collectionsData.length]);
    }
    return visibleSlides;
  };

  const visibleSlides = getVisibleSlides();

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? collectionsData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === collectionsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="slider-wrapper">
        {[...Array(slidesToShow)].map((_, idx) => (
          <SkeletonSlide key={idx} />
        ))}
      </div>
    );
  }

  if (!loading && collectionsData.length === 0) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>Hot Collections Slider</h2>
            <div className="small-border bg-color-2"></div>
            <p>No collections available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections Slider</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        <div className="slider-wrapper">
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="slides-container">
            {visibleSlides.map((collection) => (
              <div key={collection.id} className="slide active">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt={collection.title + " author"}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{collection.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollectionsSlider;
