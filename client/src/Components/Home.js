//import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import ArticleService from '../services/ArticleService';


class Home extends Component {
    temp = [];
    articleService = new ArticleService();
    /*
    componentDidMount(): void {
        this.articleService.getAllArticles()
            .then(articles => {
                this.temp = articles;
                console.log(articles);
            })
            .then(console.log(this.temp))
            .catch(error => console.error(error))
    }
     */

    render() {
        return(
            <div>
                <h1>Hei</h1>
            </div>
        );
    }

}

export default Home;