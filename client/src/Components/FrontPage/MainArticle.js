// @flow

import React, {Component} from 'react';
import './MainArticle.css';
import {Link ,HashRouter} from "react-router-dom";

type Props = {
    id : number,
    headline : string,
    image : string,
    show : boolean
}
class MainArticle extends Component<Props> {
    render() {
        if (!(this.props.show)) {
            return <div id="mainDiv"></div>
        }
        return(
            <div id="mainDiv">
                <HashRouter>
                    <Link to={"articles/" + this.props.id}><img src={this.props.image} id="imgMain"alt={this.props.headline} /> </Link>
                    <Link to={"articles/" + this.props.id}><h1>{this.props.headline}</h1></Link>
                </HashRouter>
            </div>
        );
    }

}

export default MainArticle;