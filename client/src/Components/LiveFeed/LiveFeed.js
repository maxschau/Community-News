// @flow

import React, {Component} from 'react';
import LiveFeedElement from './LiveFeedElement'
import {ArticleService, Article} from '../../services/articleService'
import './LiveFeed.css';

type State = {
    artikler: Article[]
}

class LiveFeed extends Component<State> {
    constructor(props) {
        super(props);
        this.state = {
            artikler : []
        }
    }
    render() {

        return(
            <marquee behavior="scroll">
                <div className="row flex-row flex-nowrap">
                    {this.state.artikler.map(artikkel => {
                        return (<div className="col" key={artikkel.id}><LiveFeedElement key = {artikkel.id} id = {artikkel.id} overskrift = {artikkel.overskrift} tidspunkt ={artikkel.tidspunkt} /> </div>)
                    })}
                </div>
            </marquee>
        );
    }
    componentDidMount() {
        let articleService = new ArticleService();
        articleService.getAllLiveFeedArticles()
            .then((articles) => {
                this.setState({
                    artikler : articles.data
                })
            })
            .catch((error) => console.error(error))
    }

}

export default LiveFeed;