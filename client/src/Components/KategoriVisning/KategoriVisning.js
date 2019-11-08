import React, {Component} from 'react';
import {Row, Column} from '../widgets'
import ArticleService from '../../services/articleService';
import OtherArticle from "../FrontPage/OtherArticle";
import './KategoriVisning.css';
import {Link} from "react-router-dom";
import KategoriService from '../../services/kategoriService';
import {faForward, faBackward}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*
    Må fikse sånn at 
*/
class KategoriVisning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : "",
            articles: [],
            kategori: "",
            pageNumber: 1
        }
    }
    //Denne bør ikke være hardkodet
    pageNumbers = {
        1 : [0 , 6],
        2 : [6, 13],
        3 : [13, 19]
    };

    render() {
        //console.log(this.pageNumbers[2][0]);
        return (
            <div className="main">
                <Row>
                    <Column>
                        {<h1>{this.state.kategori.navn}</h1>}
                    </Column>
                </Row>
                <hr />
                <Row>
                    {this.state.articles.slice(this.pageNumbers[this.state.pageNumber][0], this.pageNumbers[this.state.pageNumber][1]).map((article) => {
                        return <OtherArticle key={article.id} id={article.id} overskrift={article.overskrift} bilde={article.bilde}/>
                    })}
                </Row>
                <hr />
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


    componentDidUpdate(prevProps, prevState) {
        if (this.state.pageNumber !== prevState.pageNumber) {
            console.log("WTF IS GOING ON, THE STATE HAS CHANGED")
        }
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let articleService = new ArticleService();
            let kategoriService = new KategoriService();
            articleService.getArticlesByCategory(this.props.match.params.id)
                .then((articles) => {
                    this.setState({
                        id: this.props.match.params.id,
                        articles: articles.data,
                        pageNumber : 1
                    });
                })
                .catch((error) => console.error(error));
            kategoriService.getOne(this.props.match.params.id)
                .then((kategori) => {
                    this.setState({
                    kategori: kategori.data[0]
                });
            });
        }
    }

    componentDidMount(): void {
        console.log("ComponentDidMount()");
        let articleService = new ArticleService();
        let kategoriService = new KategoriService();
        articleService.getArticlesByCategory(this.props.match.params.id)
            .then((articles) => {
                this.setState({
                    id: this.props.match.params.id,
                    articles: articles.data
                });
            })
            .catch((error) => console.error(error))
        kategoriService.getOne(this.props.match.params.id)
            .then((kategori) => {
                this.setState({
                    kategori: kategori.data[0]
                });
            });
    }
}

export default KategoriVisning;