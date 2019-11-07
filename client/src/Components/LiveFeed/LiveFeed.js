// @flow

import React, {Component} from 'react';
import LiveFeedElement from './LiveFeedElement'
import ArticleService from '../../services/articleService'
import './LiveFeed.css';

class LiveFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artikler : []
        }
    }
    
    render() {

        return(
            <marquee behavior="scroll" width="100%">
            <div className="container-fluid ticker mainLiveFeed">
                <div className="mainLiveFeed row flex-row flex-nowrap">
                    {this.state.artikler.map(artikkel => {
                        return (<div className="col" key={artikkel.id}><LiveFeedElement key = {artikkel.id} id = {artikkel.id} overskrift = {artikkel.overskrift} tidspunkt ={artikkel.tidspunkt} /> </div>)
                    })}
                </div>
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