// HA MED FLOW FOR FÆÆÆM
///!!!!
// HA MED FLOW FOR FÆÆÆM
///!!!!
// HA MED FLOW FOR FÆÆÆM
///!!!!

import React, {Component} from 'react';
import ArticleService, {Article} from '../../services/articleService';
import './MainArticle.css';
import {Link} from "react-router-dom";

class MainArticle extends Component {

    render() {
        return(
            <div id="mainDiv">
                <Link to={"nyheter/" + this.props.id}><img src={this.props.bilde} id="imgMain"alt={this.props.overskrift} /> </Link>
                <Link to={"nyheter/" + this.props.id}><h1>{this.props.overskrift}</h1></Link>
            </div>
        );
    }

}

export default MainArticle;