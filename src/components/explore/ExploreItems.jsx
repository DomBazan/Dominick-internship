import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const formatTime = (milliseconds) => {
  if (milliseconds <= 0) return "00h 00m 00s";
  let totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  totalSeconds %= 3600;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}h ${minutes}m ${seconds}s`;
};

const SkeletonItem = () => (
  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item skeleton">
      <div className="author_list_pp skeleton-circle"></div>
      <div className="de_countdown skeleton-line short"></div>
      <div className="nft__item_wrap skeleton-box"></div>
      <div className="nft__item_info">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  </div>
);

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const url = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const response = await axios.get(url);
        setItems(response.data);
        setLoading(false);

        // Initialize countdowns using expiryDate
        const initialCountdowns = {};
        const now = Date.now();
        response.data.forEach((item) => {
          const expiryTime = new Date(item.expiryDate).getTime();
          const remaining = expiryTime - now;
          initialCountdowns[item.id] = remaining > 0 ? remaining : 0;
        });
        setCountdowns(initialCountdowns);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, [filter]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const updatedCountdowns = {};
        Object.keys(prevCountdowns).forEach((id) => {
          const newTime = prevCountdowns[id] - 1000;
          updatedCountdowns[id] = newTime > 0 ? newTime : 0;
        });
        return updatedCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAuthorClick = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  const handleItemClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setDisplayCount(8);
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setDisplayCount((prev) => Math.min(prev + 4, items.length));
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => <SkeletonItem key={index} />)
        : items.slice(0, displayCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp" title={`Creator: ${item.authorName}`}>
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy author-image" src={item.authorImage} alt={item.authorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                </div>
                <div className="de_countdown">{formatTime(countdowns[item.id])}</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                    onClick={() => handleItemClick(item.nftId)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div
                  className="nft__item_info"
                  onClick={() => handleItemClick(item.nftId)}
                  style={{ cursor: "pointer" }}
                >
                  <h4>{item.title}</h4>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {!loading && displayCount < items.length && (
        <div className="col-md-12 text-center">
          <a href="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
            Load more
          </a>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
