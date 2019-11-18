// @flow

import React, {Component} from 'react'
import {Column} from '../widgets'
import {Link} from "react-router-dom";
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
                <div>
                    <Link to={"/articles/" + this.props.id}><img id="otherImg" src={this.props.image}
                                                                    alt={this.props.headline}/></Link>
                    <Link to={"/articles/" + this.props.id}><p>{this.props.headline}</p></Link>
                </div>
            </Column>
        );
    }
}

export default OtherArticle;