import React, {Component} from 'react';
import {Row, Column} from '../widgets'
import ArticleService from '../../services/articleService';
import OtherArticle from "../FrontPage/OtherArticle";
import './KategoriVisning.css';
import KategoriService from '../../services/kategoriService';

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

    render() {
        return (
            <div className="main">
                <Row>
                    <Column>
                        {<h1>{this.state.kategori.navn}</h1>}
                    </Column>
                </Row>
                <Row>
                    {this.state.articles.map((article) => {
                        return <OtherArticle key={article.id} id={article.id} overskrift={article.overskrift} bilde={article.bilde}/>
                    })}
                </Row>
                <Row>
                    <Column>
                        <p>Page {this.state.pageNumber}</p>

                    </Column>
                </Row>
            </div>
        );
    }

    /*

    Burde endre slik at jeg ikke får så mye dobbellagring av kode??!!

    !???!

    !!!????

    */
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
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