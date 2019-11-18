// @flow

import React, {Component} from 'react';
import Header from './Components/Header/Header'
import {HashRouter, Route} from "react-router-dom";
import CreateArticle from "./Components/CreateArticle/CreateArticle";
import Article from './Components/Article/Article';
import Footer from './Components/Footer/Footer'
import FrontPage from './Components/FrontPage/FrontPage'
import ChangeArticle from './Components/ChangeArticle/ChangeArticle';
import CategoryView from './Components/CategoryView/CategoryView'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Main extends Component<> {


    render() {
        return(
            <HashRouter>
                <ToastContainer />
                <Header />
                <Route exact path="/home" component={FrontPage} />
                <Route exact path="/createArticle" component={CreateArticle} />
                <Route exact path="/articles/:id" component={Article} />
                <Route exact path="/articles/edit/:id" component={ChangeArticle} />
                <Route exact path="/categories/:id" component={CategoryView} />
                <Footer />
            </HashRouter>
        );
    }
}

export default Main;