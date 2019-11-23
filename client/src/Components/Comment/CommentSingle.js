// @flow

import React, {Component} from 'react';
import {Column, Row} from '../../Components/widgets';
import './CommentSingle.css';

type Props = {
    name : string,
    comment : string,
    time : string
}

class CommentSingle extends Component<Props> {
    render() {
        return(
            <div className={"commentCard"}>
                <Row>
                    <Column>
                        <b><p className={"text"}>{this.props.name}:</p></b>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <p className={"text"}>{this.props.comment}</p>
                    </Column>
                    <Column>
                        <p className={"minorText"}> Skrevet: {this.props.time.substring(11,16) + " | " +  this.props.time.substring(0,10)}</p>
                    </Column>
                </Row>
                 <hr />
            </div>
        )
    }

}

export default CommentSingle;