// @flow

import React, {Component} from 'react'
import MainArticle from './MainArticle'
import OtherArticle from './OtherArticle'
import ArticleService from '../../services/articleService';
import LiveFeed from '../LiveFeed/LiveFeed';
import './FrontPage.css'
import {faForward, faBackward}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Row, Column} from '../widgets'

type State= {
    mainArticle : Article,
    articles : Article[],
    pageNumber : number
}

class FrontPage extends Component<State> {

    constructor(props) {
        super(props);
        this.state = {
            mainArticle: "",
            articles: [],
            pageNumber : 1  
        }
    }

    pageNumbers = {
        1 : [1 , 7],
        2 : [7, 13],
        3 : [13, 19]
    };

    render() {
        return (
            <div className="front">
                <LiveFeed/>
                <MainArticle id={this.state.mainArticle.id} overskrift={this.state.mainArticle.overskrift} bilde={this.state.mainArticle.bilde}/>
                <hr />
                <Row className="justify-content-center">
                {this.state.articles.slice(this.pageNumbers[this.state.pageNumber][0], this.pageNumbers[this.state.pageNumber][1]).map((article) => {
                    return (
                        <OtherArticle key={article.id} id={article.id} overskrift={article.overskrift}
                                      bilde={article.bilde}/>
                    )
                })}
                </Row>
                <Row>
                    <Column>
                        <p onClick={this.handleLastPage}><FontAwesomeIcon icon={faBackward} /> </p>
                    </Column>
                    <Column>
                        <p>Page {this.state.pageNumber}</p>
                    </Column>
                    <Column>
                        <p onClick={this.handleNextPage}><FontAwesomeIcon icon={faForward} /> </p>
                    </Column>
                </Row>
            </div>
        );
    }

        handleNextPage = () => {
    
        let number = this.state.pageNumber + 1;
        this.setState({
            pageNumber : number
        })
    };

    handleLastPage = () => {
        if (this.state.pageNumber > 1) {
            let number = this.state.pageNumber - 1;
            this.setState({
                pageNumber : number
            })
        }
    };

    componentDidMount() {
        let articleService = new ArticleService();
        articleService.getAllArticlesFrontPage()
            .then((articles) => {
                this.setState({
                    mainArticle: articles.data[0],
                    articles: articles.data
                })
            })
    }


}

export default FrontPage;