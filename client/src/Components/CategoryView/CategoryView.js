// @flow

import React, {Component} from 'react';
import {Row, Column} from '../widgets'
import {ArticleService, Article} from '../../services/ArticleService';
import OtherArticle from "../FrontPage/OtherArticle";
import './CategoryView.css';
import {Link} from "react-router-dom";
import CategoryService from '../../services/CategoryService';
import {faForward, faBackward}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type State = {
    id : number,
    articles : Article[],
    category : number,
    pageNumber : number,
    maxPage : number,
    limitPerPage : number
}
class CategoryView extends Component<State> {

    constructor(props : any) {
        super(props);
        this.state = {
            id : "",
            articles: [],
            category: "",
            pageNumber: 0,
            maxPage : "",
            limitPerPage : 6
        }
    }
    render() {
        return (
            <div className="main">
                <Row>
                    <Column>
                        {<h1>{this.state.category.name}</h1>}
                    </Column>
                </Row>
                <hr />
                <Row>
                    {this.state.articles.slice(this.state.pageNumber*this.state.limitPerPage, this.state.pageNumber*this.state.limitPerPage+6).map((article) => {
                        return <OtherArticle key={article.id} id={article.id} headline={article.headline} image={article.image}/>
                    })}
                </Row>
                <hr />
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

    handleNextPage : void = () => {
        let number = (this.state.pageNumber + 1)%(this.state.maxPage);
        this.setState({
            pageNumber : number
        })
    };

    handleLastPage : void = () => {
        if (this.state.pageNumber > 0) {
            let number = this.state.pageNumber - 1;
            this.setState({
                pageNumber : number
            })
        }
    };


    componentDidUpdate(prevProps, prevState) : void {
        if (this.state.pageNumber !== prevState.pageNumber) {
            console.log("WTF IS GOING ON, THE STATE HAS CHANGED")
        }
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let articleService = new ArticleService();
            let categoryService = new CategoryService();
            articleService.getArticlesByCategory(this.props.match.params.id)
                .then((articles) => {
                    this.setState({
                        id: this.props.match.params.id,
                        articles: articles.data,
                        maxPage : Math.ceil((articles.data.length / this.state.limitPerPage)),
                        pageNumber : 0
                    });
                })
                .catch((error) => console.error(error));
            categoryService.getOne(this.props.match.params.id)
                .then((category) => {
                    this.setState({
                    category: category.data[0]
                });
            });
        }
    }

    componentDidMount(): void {
        console.log("ComponentDidMount()");
        let articleService = new ArticleService();
        let categoryService = new CategoryService();
        articleService.getArticlesByCategory(this.props.match.params.id)
            .then((articles) => {
                this.setState({
                    id: this.props.match.params.id,
                    articles: articles.data,
                    maxPage : Math.floor((articles.data.length / this.state.limitPerPage)) + 1
                });
            })
            .catch((error) => console.error(error));
        categoryService.getOne(this.props.match.params.id)
            .then((category) => {
                this.setState({
                    category: category.data[0]
                });
            })
            .catch((error) => console.error(error));
    }
}

export default CategoryView;