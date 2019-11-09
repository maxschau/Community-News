// @flow

import React, {Component} from 'react';
import ArticleService, {Article} from '../../services/articleService';
import './MainArticle.css';
import {Link} from "react-router-dom";

type Props = {
    id : number,
    overskrift : string,
    bilde : string
}
class MainArticle extends Component<Props> {

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