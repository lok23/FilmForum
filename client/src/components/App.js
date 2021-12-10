import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from "./views/MovieDetail/MovieDetail"
import FavoritePage from "./views/FavoritePage/FavoritePage"
import SearchPage from "./views/SearchPage/SearchPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ProfileEditPage from "./views/ProfilePage/ProfileEditPage";
import OtherProfilePage from "./views/ProfilePage/OtherProfilePage";
import Modal from "./modal/Modal";
import PrivacyPolicyPage from "./views/PrivacyPolicyPage/PrivacyPolicyPage";
function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorites" component={Auth(FavoritePage, null)} />
          <Route exact path="/searchpage/:page" component={Auth(SearchPage, null)}/>
          <Route exact path="/profile/" component={Auth(ProfilePage, null)}/>
          <Route exact path="/profileEdit/" component={Auth(ProfileEditPage, null)}/>
          <Route exact path="/profile/:user" component={Auth(OtherProfilePage, null)}/>
          <Route exact path="/Modal" component={Auth(Modal, null)}/>
          <Route exact path="/privacyPolicyPage" component={Auth(PrivacyPolicyPage, null)}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
