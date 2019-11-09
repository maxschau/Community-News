// @flow

import React, {Component} from 'react'
import {Column} from '../widgets'
import {Link} from "react-router-dom";
import './OtherArticle.css'

type Props = {
    id : number,
    overskrift : string,
    bilde : string
}

class OtherArticle extends Component<Props> {
    render() {
        return (
            <Column width={6}>
                <div>
                    <Link to={"/nyheter/" + this.props.id}><img id="otherImg" src={this.props.bilde}
                                                                    alt={this.props.overskrift}/></Link>
                    <Link to={"/nyheter/" + this.props.id}><p>{this.props.overskrift}</p></Link>
                </div>
            </Column>
        );
    }
}

export default OtherArticle;