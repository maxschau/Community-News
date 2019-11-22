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
                <div>
                    {//Getting an error which says that I cannot use Link outside a Router} 
                    }
                    <HashRouter>
                        <Link to={"/articles/" + this.props.id}><img id="otherImg" src={this.props.image}
                                                                        alt={this.props.headline}/></Link>
                        <Link to={"/articles/" + this.props.id}><p>{this.props.headline}</p></Link>
                    </HashRouter>
                </div>
            </Column>
        );
    }
}

export default OtherArticle;