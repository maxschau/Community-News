// @flow

import React, {Component} from 'react';
import LiveFeedElement from './LiveFeedElement'
import {ArticleService, Article} from '../../services/ArticleService'
import './LiveFeed.css';

type State = {
    articles: Article[]
}

class LiveFeed extends Component<State> {
    constructor(props : any) {
        super(props);
        this.state = {
            articles : []
        }
    }
    render() {

        return(
            <marquee behavior="scroll">
                <div className="row flex-row flex-nowrap">
                    {this.state.articles.map(article => {
                        return (<div className="col" key={article.id}><LiveFeedElement key = {article.id} id = {article.id} headline= {article.headline} time={article.time} /> </div>)
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
                    articles : articles.data
                })
            })
            .catch((error) => console.error(error))
    }

}

export default LiveFeed;