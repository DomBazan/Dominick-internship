import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ nftCollection, authorId, authorProfileImage }) => {
  if (!nftCollection || nftCollection.length === 0) {
    return <div>No NFTs found for this author.</div>;
  }

  return (
    <div className="de_tab_content" style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 20 }}>
      <div className="tab-1" style={{ display: "inline-flex", gap: 20 }}>
        {nftCollection.map((nft, index) => (
          <div
            className="nft__item"
            key={index}
            style={{
              display: "inline-block",
              width: 280,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "white",
              padding: 10,
              position: "relative",
            }}
          >
            <div
              className="author_list_pp"
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                borderRadius: "50%",
                border: "2px solid white",
                width: 40,
                height: 40,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 0 5px rgba(0,0,0,0.15)",
                backgroundColor: "white",
              }}
            >
              <Link to={`/author/${authorId || ""}`}>
                <img
                  className="lazy author-image"
                  src={authorProfileImage || "/default-profile.png"}
                  alt="Author Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
                <i
                  className="fa fa-check"
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    backgroundColor: "#6a4fff",
                    color: "white",
                    borderRadius: "50%",
                    padding: "3px 5px",
                    fontSize: "10px",
                    border: "2px solid white",
                  }}
                ></i>
              </Link>
            </div>
            <div className="nft__item_wrap" style={{ marginTop: 40, borderRadius: 12, overflow: "hidden" }}>
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href={nft.facebookLink || "#"} target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href={nft.twitterLink || "#"} target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href={nft.emailLink || "#"}>
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item/${nft.nftId || ""}`}>
                <img
                  src={nft.nftImage || ""}
                  className="lazy nft__item_preview"
                  alt={nft.title || "NFT"}
                  style={{ borderRadius: 12, cursor: "pointer", width: "100%", height: "180px", objectFit: "cover" }}
                />
              </Link>
              <div className="nft__item_info" style={{ marginTop: 10, cursor: "pointer" }}>
                <Link to={`/item/${nft.nftId || ""}`}>
                  <h4>{nft.title || "Untitled"}</h4>
                </Link>
                <div className="nft__item_price">{nft.price ? `${nft.price} ETH` : "Price N/A"}</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{nft.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorItems;
