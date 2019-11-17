// @flow

import React, {Component} from 'react'
import MainArticle from './MainArticle'
import OtherArticle from './OtherArticle'
import ArticleService, {Article} from '../../services/articleService';
import LiveFeed from '../LiveFeed/LiveFeed';
import './FrontPage.css'
import {faForward, faBackward}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Row, Column} from '../widgets'
import {toast} from 'react-toastify';

type State= {
    mainArticle : Article,
    articles : Article[],
    pageNumber : number,
    maxPage : number,
    limitPerPage : number,
    frontPage : boolean
}

class FrontPage extends Component<State> {

    constructor(props) {
        super(props);
        this.state = {
            mainArticle: "",
            articles: [],
            pageNumber : 0,
            maxPage : "",
            limitPerPage : 6,
            frontPage : true
        }
    }


    pageNumbers = {
        0 : [1 , 7],
        1 : [7, 13],
        2 : [13, 19],
        3 : [19, 25]
    };

    render() {
        return (
            <div className="front">
                <LiveFeed/>
                <MainArticle show = {this.state.frontPage} id={this.state.mainArticle.id} overskrift={this.state.mainArticle.overskrift} bilde={this.state.mainArticle.bilde}/>
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

        handleNextPage : void = () => {
        let number = (this.state.pageNumber + 1)%(this.state.maxPage)
        if (number > 0) {
            this.setState({
                frontPage : false
            });
        }
        console.log("number: " + number)
        if (number == 0) {
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
            if (number == 0) {
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
                    mainArticle: articles.data[0],
                    articles: articles.data,
                    maxPage : Math.floor((articles.data.length / this.state.limitPerPage))
                })
            })
    }


}

export default FrontPage;