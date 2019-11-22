// @flow

import React, {Component} from 'react'
import MainArticle from './MainArticle'
import OtherArticle from './OtherArticle'
import ArticleService, {Article} from '../../services/ArticleService';
import LiveFeed from '../LiveFeed/LiveFeed';
import './FrontPage.css'
import {faForward, faBackward}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Row, Column} from '../widgets'

type State= {
    mainArticle : Article,
    articles : Article[],
    pageNumber : number,
    maxPage : number,
    limitPerPage : number,
    frontPage : boolean
}

type Props = {}

class FrontPage extends Component<Props,State> {

    constructor(props : any) {
        super(props);
        this.state = {
            mainArticle: {},
            articles: [],
            pageNumber : 0,
            maxPage : 0,
            limitPerPage : 6,
            frontPage : true
        }
    }

    render() {
        return (
            <div className="front">
                <LiveFeed/>
                <MainArticle show = {this.state.frontPage} id={this.state.mainArticle.id} headline={this.state.mainArticle.headline} image={this.state.mainArticle.image}/>
                <hr />
                <Row className="justify-content-center">
                {this.state.articles.slice(this.state.pageNumber * this.state.limitPerPage, this.state.pageNumber * this.state.limitPerPage + 6).map((article) => {
                    return (
                        <OtherArticle key={article.id} id={article.id} headline={article.headline}
                                      image={article.image}/>
                    )
                })}
                </Row>
                <Row>
                    <Column>
                        <p onClick={this.handleLastPage}><FontAwesomeIcon icon={faBackward} /> </p>
                    </Column>
                    <Column>
                        <p>Page {this.state.pageNumber + 1}</p>
                    </Column>
                    <Column>
                        <p onClick={this.handleNextPage}><FontAwesomeIcon icon={faForward} /> </p>
                    </Column>
                </Row>
            </div>
        );
    }

        handleNextPage = () => {
        let number = (this.state.pageNumber + 1)%(this.state.maxPage);
        if (number > 0) {
            this.setState({
                frontPage : false
            });
        }
        if (number === 0) {
            this.setState({
                frontPage : true
            })
        }

        this.setState({
            pageNumber : number
        })
    };

    handleLastPage = () => {
        if (this.state.pageNumber > 0) {
            let number = this.state.pageNumber - 1;
            if (number === 0) {
                this.setState({
                    frontPage: true
                })
            }
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
                    //mainArticle: articles.data[0],
                    mainArticle : articles[0],
                    //articles: articles.data.slice(1),
                    articles: articles.slice(1),
                    //maxPage : Math.ceil(((articles.data.length) / this.state.limitPerPage))
                    maxPage : Math.ceil(((articles.length) / this.state.limitPerPage))
                });
            })
    }


}

export default FrontPage;