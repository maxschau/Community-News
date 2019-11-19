// @flow
import React, {Component} from 'react';
import ArticleService from '../../services/ArticleService';
import {Column, Row, Card} from '../../Components/widgets';
import {Link} from "react-router-dom";
import {faThumbsUp, faThumbsDown }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Article.css';
import {toast} from 'react-toastify';


type State = {
    headline: string,
    ingress: string,
    contents: string,
    category: number,
    image: string,
    importance:number,
    time: string,
    author: string,
    likes : number,
    liked : boolean
}

type Props = {}

type props= {}

class Article extends Component<Props> {
    constructor(props : any) {
        super(props);
        this.state = {
            headline:"",
            ingress: "",
            contents:"",
            category:"",
            image:"",
            importance:"",
            time:"",
            author:"",
            likes : "",
            liked : false
        };
    }

    notifyFailure: void = () => toast("Det er kun lov å gi én like!", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    handleThumbsUp = () => {
        if (!(this.state.liked)) {
            this.setState({
                likes : this.state.likes + 1,
                liked : true
            });
        this.updateLikes();
        } else {
            this.notifyFailure();
        }
    };

    updateLikes = () => {
        let articleService = new ArticleService();
        articleService.updateLikes(this.props.match.params.id)
            .then(() => {
                console.log("Updating likes")
            })
            .catch((error) => {
                console.error(error);
            })
    };

    render() {
        return(
            <div className="d-flex justify-content-center" id="container">
                <Card title={""}>
                    <Row>
                        <Column> 
                            <img src={this.state.image} alt = {this.state.headline} id="img" />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h1>{this.state.headline}</h1>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h4>{this.state.ingress}</h4>
                            <hr />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={9}>
                            <h5 className={"timeText float-left"}><b>Publisert: </b> {this.state.time} av {this.state.author}</h5>
                        </Column>
                        <Column width={3}>
                            <span><p onClick={() => this.handleThumbsUp()}><FontAwesomeIcon id="iconLikes" icon={faThumbsUp}/>   {this.state.likes}</p></span>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h5>{this.state.contents}</h5>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Link to={"/articles/edit/" + this.props.match.params.id}><button className="btn btn-secondary">Endre </button></Link>
                        </Column>
                    </Row>
                </Card>
            </div>
        );
    }


    componentDidMount() {
        let articleService = new ArticleService();
        articleService.getOneArticle(this.props.match.params.id)
            .then((article) => {
                console.log(article.data[0]);
                let time = article.data[0].time.substring(0, article.data[0].time.length-1);
                time = time.replace("T", " ");
                time = time.replace('.000', "");
                this.setState({
                    headline : article.data[0].headline,
                    ingress: article.data[0].ingress,
                    contents:article.data[0].contents,
                    category:article.data[0].category,
                    image:article.data[0].image,
                    importance:article.data[0].importance,
                    time: time,
                    author: article.data[0].author,
                    likes : article.data[0].likes
                });
            })
            .catch((error => console.error(error)))

    }
}

export default Article;