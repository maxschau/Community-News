// @flow

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LiveFeedElement.css';

type State = {
    id : number,
    overskrift : string,
    tidspunkt: string
}

type Props = {
    id: number,
    tidspunkt : string
}
class LiveFeedElement extends Component<State> {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            overskrift:"",
            tidspunkt:""
        }
    }
    render() {
        return(
            <div>
                <Link to={"/nyheter/" + this.state.id}><p><b>{this.state.overskrift}</b> {this.state.tidspunkt} | </p></Link>
            </div>
        );
    }

    componentDidMount() {
        //Some small changes to format the date to a more appropiate format
        let tidspunkt = this.props.tidspunkt.substring(0, this.props.tidspunkt.length-1);
        tidspunkt = tidspunkt.replace("T", " ");
        tidspunkt = tidspunkt.replace('.000', "");
        this.setState({
            id : this.props.id,
            overskrift : this.props.overskrift,
            tidspunkt : tidspunkt
        });
    }

}

export default LiveFeedElement;