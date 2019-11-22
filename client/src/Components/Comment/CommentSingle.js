// @flow

import React, {Component} from 'react';
import {Column, Row} from '../../Components/widgets';
import './CommentSingle.css';

type Props = {
    name : string,
    comment : string
}

class CommentSingle extends Component<Props> {
    render() {
        return(
            <div>
                <Row>
                    <Column>
                        <b>{this.props.name}:</b>
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