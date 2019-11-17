// @flow

import React, {Component} from 'react';
import Header from './Components/Header/Header'
import {HashRouter, Route} from "react-router-dom";
import RegistrerSak from "./Components/RegistrerSak/RegistrerSak";
import Artikkel from './Components/Artikler/Artikkel';
import Footer from './Components/Footer/Footer'
import FrontPage from './Components/FrontPage/FrontPage'
import EndreArtikkel from './Components/EndreArtikkel/EndreArtikkel';
import KategoriVisning from './Components/KategoriVisning/KategoriVisning'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Main extends Component<> {


    render() {
        return(
            <HashRouter>
                <ToastContainer />
                <Header />
                <Route exact path="/home" component={FrontPage} />
                <Route exact path="/reg" component={RegistrerSak} />
                <Route exact path="/nyheter/:id" component={Artikkel} />
                <Route exact path="/nyheter/endre/:id" component={EndreArtikkel} />
                <Route exact path="/kategorier/:id" component={KategoriVisning} />
                
                <Footer />
            </HashRouter>
        );
    }
}

export default Main;