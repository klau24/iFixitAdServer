import ButtonAppBar from "../Header.js";
import React from "react";
import CampaignCard from "./CampaignCards";
import CampaignCreate from "./CampaignCreate";

const CampaignView = () => {
  return (
    <div>
      <ButtonAppBar title="Campaigns" />
      <CampaignCreate />
      <CampaignCard></CampaignCard>
    </div>
  );
};

export default CampaignView;
