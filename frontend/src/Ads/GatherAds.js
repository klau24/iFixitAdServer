import React, { useState, useEffect } from "react";

const GatherAds = () => {
  const [ads, setAds] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3001/listads")
      .then((res) => res.json())
      .then((camps) => setAds(camps));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Campaigns</h1>
      {ads &&
        ads.length > 0 &&
        ads.map((item) => (
          <p>
            ad main header: {item.mainHeader}
            ad sub header: {item.subHeader}
            ad image source: {item.image}
            campaign id: {item._id}
          </p>
        ))}
    </div>
  );
};
export default GatherAds;
