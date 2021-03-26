import React, { useState, useEffect } from "react";

const GatherCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3001/listcampaigns")
      .then((res) => res.json())
      .then((camps) => setCampaigns(camps));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Campaigns</h1>
      {campaigns &&
        campaigns.length > 0 &&
        campaigns.map((item) => (
          <p>
            campaign title: {item.campaignTitle}
            campaign start date: {item.startTime}
            campaign end date: {item.endTime}
            campaign description: {item.description}
            campaign id: {item._id}
          </p>
        ))}
    </div>
  );
};
export default GatherCampaigns;
