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
            <div>
                <Row>
                    <Column>
                        <b>{this.props.name}:</b> Skrevet: {this.props.time.substring(11,16) + " | " +  this.props.time.substring(0,10)}
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {this.props.comment}
                    </Column>
                </Row>
                 <hr />
            </div>
        )
    }

}

export default CommentSingle;