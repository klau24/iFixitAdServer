import ButtonAppBar from "../Header.js";
import React from "react";
import AdCards from "./AdCards";
import AdCreate from "./AdCreate";
const AdView = () => {
  return (
    <div>
      <ButtonAppBar title="Ads" />
      <AdCreate />
      <AdCards></AdCards>
    </div>
  );
};

export default AdView;
