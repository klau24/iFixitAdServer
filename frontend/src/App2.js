import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdView from "./Ads/AdView";
import CampaignView from "./Campaigns/CampaignView";
import HomePage from "./HomePage";
import MainMenu from "./MainMenu";

function App2() {
  return (
    <BrowserRouter>
      <MainMenu>
        <div className="container mt-2" style={{ marginTop: 40 }}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/ads">
              <AdView />
            </Route>
            <Route path="/campaigns">
              <CampaignView />
            </Route>
          </Switch>
        </div>
      </MainMenu>
    </BrowserRouter>
  );
}
export default App2;
