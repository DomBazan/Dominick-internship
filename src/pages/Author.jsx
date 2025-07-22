import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = ({ id }) => {
  const params = useParams();
  const authorId = id || params.authorId;
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        console.log("Fetching author data for ID:", authorId);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        console.log("Author API response:", response);
        const data = response.data;
        setAuthor({
          name: data.authorName,
          username: data.tag,
          walletAddress: data.address,
          profileImage: data.authorImage,
          bannerImage: data.bannerImage || "", // fallback if missing
          followers: data.followers,
          nftCollection: data.nftCollection,
        });
        console.log("NFT Collection:", data.nftCollection);
        console.log("Author ID:", authorId);

         setFollowersCount(data.followers);
         setLoading(false);
       } catch (error) {
         console.error("Error fetching author details:", error);
        setLoading(false);
      }
    };
    if (authorId) {
      fetchAuthor();
    } else {
      console.warn("No authorId found in URL params");
      setLoading(false);
    }
  }, [authorId]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const handleCopyClick = () => {
    if (author && author.walletAddress) {
      navigator.clipboard.writeText(author.walletAddress);
      alert("Wallet address copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ height: 300, backgroundColor: "#ccc" }}
          ></section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={150} height={150} borderRadius="50%" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={200} height={30} />
                            <span className="profile_username">
                              <Skeleton width={100} height={20} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={150} height={20} />
                            </span>
                            <button id="btn_copy" title="Copy Text" disabled>
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={100} height={20} />
                        </div>
                        <button className="btn-main" disabled>
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <Skeleton width="100%" height={300} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            backgroundImage: author.bannerImage
              ? `url(${author.bannerImage})`
              : author.nftCollection && author.nftCollection.length > 0
              ? `url(${author.nftCollection[0].nftImage})`
              : "url('/default-banner.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: 300,
            filter: 'brightness(0.7)',
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                          src={author.profileImage || "/default-profile.png"}
                          alt={author.name || "Author Profile"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-profile.png";
                          }}
                          style={{ borderRadius: "50%", width: 150, height: 150, objectFit: "cover" }}
                        />
                        <i
                          className="fa fa-check"
                          style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            backgroundColor: "#6a4fff",
                            color: "white",
                            borderRadius: "50%",
                            padding: "5px",
                            fontSize: "14px",
                            border: "2px solid white",
                          }}
                        ></i>
                      </div>
                      <div className="profile_name" style={{ display: "inline-block", marginLeft: 20, verticalAlign: "top" }}>
                        <h4 style={{ marginBottom: 5 }}>
                          {author.name}
                          <span className="profile_username" style={{ display: "block", color: "#6a4fff", fontWeight: "normal", fontSize: "14px" }}>
                            @{author.username}
                          </span>
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span id="wallet" className="profile_wallet" style={{ fontFamily: "monospace", fontSize: "14px", color: "#555" }}>
                            {author.walletAddress}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={handleCopyClick}
                            style={{
                              backgroundColor: "#6a4fff",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              padding: "4px 8px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex" style={{ marginTop: 20, alignItems: "center" }}>
                    <div className="de-flex-col" style={{ display: "flex", alignItems: "center", gap: 15 }}>
                      <div className="profile_follower" style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {followersCount} followers
                      </div>
                      <button
                        className="btn-main"
                        onClick={handleFollowClick}
                        style={{ padding: "8px 20px", fontSize: "14px", borderRadius: "6px" }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                <AuthorItems nftCollection={author.nftCollection} authorId={authorId} authorProfileImage={author.profileImage} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
