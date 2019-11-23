// @flow

import React, {Component} from 'react';
import {Link, HashRouter} from "react-router-dom";
import './LiveFeedElement.css';

type State = {
    id : number,
    headline : string,
    time: string
}

type Props = {
    id: number,
    headline : string,
    time : string
}
class LiveFeedElement extends Component<Props, State> {
    constructor(props : any) {
        super(props);
        this.state = {
            id : 0,
            headline:"",
            time:""
        }
    }
    render() {
        return(
            <div>
                <HashRouter>
                    <Link to={"/articles/" + this.state.id}><p id={"liveFeedP"}><b>{this.state.headline}</b> {this.state.time} | </p></Link>
                </HashRouter>
            </div>
        );
    }

    componentDidMount() {
        //Some small changes to format the date to a more appropiate format
        let time = this.props.time.substring(0, this.props.time.length-1);
        time = time.replace("T", " ");
        time = time.replace('.000', "");
        this.setState({
            id : this.props.id,
            headline : this.props.headline,
            time : time
        });
    }

}

export default LiveFeedElement;