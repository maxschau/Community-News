import React, {Component} from 'react';
import {Column, Row} from '../../Components/widgets';
import './CommentSingle.css';



class CommentSingle extends Component<State, Props> {
    constructor(props) {
        super(props);
        this.state= {

        }
    }

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