import React, {Component} from 'react'
import MainArticle from './MainArticle'
import OtherArticle from './OtherArticle'
import ArticleService from '../../services/articleService';
import LiveFeed from '../LiveFeed/LiveFeed';
import './FrontPage.css'
import {Row, Column} from '../widgets'


class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainArticle: "",
            articles: []
        }
    }

    render() {
        return (
            <div className="front">
                <LiveFeed/>
                <MainArticle id={this.state.mainArticle.id} overskrift={this.state.mainArticle.overskrift} bilde={this.state.mainArticle.bilde}/>
                <hr />
                <Row className="justify-content-center">
                {this.state.articles.slice(1).map((article) => {
                    return (
                        <OtherArticle key={article.id} id={article.id} overskrift={article.overskrift}
                                      bilde={article.bilde}/>
                    )
                })}
                </Row>
            </div>
        );
    }

    componentDidMount() {
        let articleService = new ArticleService();
        articleService.getAmountOfArticles(11)
            .then((articles) => {
                this.setState({
                    mainArticle: articles.data[0],
                    articles: articles.data
                })
            })
    }


}

export default FrontPage;