// @flow

import React, {Component} from 'react'
import {Column} from '../widgets'
import {Link, HashRouter} from "react-router-dom";
import './OtherArticle.css'

type Props = {
    id : number,
    headline : string,
    image : string
}

class OtherArticle extends Component<Props> {
    render() {
        return (
            <Column width={6}>
                <div id={"mainOtherArticle"}>
                    <HashRouter>
                        <Link to={"/articles/" + this.props.id}><img id="otherImg" src={this.props.image}
                                                                        alt={this.props.headline}/></Link>
                        <Link to={"/articles/" + this.props.id}><h5 id={"otherArticleHeadline"}>{this.props.headline}</h5></Link>
                    </HashRouter>
                </div>
            </Column>
        );
    }
}

export default OtherArticle;