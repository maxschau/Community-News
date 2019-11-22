// @flow
import React, {Component} from 'react';
import ArticleService from '../../services/ArticleService';
import CommentView from "../Comment/CommentView";
import {Column, Row, Card} from '../../Components/widgets';
import {Link, HashRouter} from "react-router-dom";
import {faThumbsUp }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Article.css';
import {toast} from 'react-toastify';


type State = {
    headline: string,
    ingress: string,
    contents: string,
    category: number,
    image: string,
    importance: number,
    time: string,
    author: string,
    likes : number,
    liked : boolean
}

type Props = {
    match : { params : { id: number}}
};


class Article extends Component<Props, State> {
    constructor(props : any) {
        super(props);
        this.state = {
            headline:"",
            ingress: "",
            contents:"",
            category:-1,
            image:"",
            importance:-1,
            time:"",
            author:"",
            likes : 0,
            liked : false,
            comments : ""
        };
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
    }



    notifyFailure = () => toast("Det er kun lov å gi én like!", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

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
                            <span><p data-toggle="tooltip" data-placement="top" title="Gi en like!!" onClick={() => this.handleThumbsUp()}><FontAwesomeIcon id="iconLikes" icon={faThumbsUp}/>   {this.state.likes}</p></span>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h5>{this.state.contents}</h5>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <HashRouter>
                            <Link to={"/articles/edit/" + this.props.match.params.id}><button className="btn btn-dark">Endre </button></Link></HashRouter>
                        </Column>
                    </Row>
                    <hr/>
                    <Row>
                        <Column>
                            <CommentView id={this.props.match.params.id} />
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
                let time = article[0].time.substring(0, article[0].time.length-1);
                time = time.replace("T", " ");
                time = time.replace('.000', "");
                console.log(article);
                this.setState({
                    headline : article[0].headline,
                    ingress: article[0].ingress,
                    contents:article[0].contents,
                    category:article[0].category,
                    image:article[0].image,
                    importance:article[0].importance,
                    time: time,
                    author: article[0].author,
                    likes : article[0].likes
                });
            })
            .catch((error => console.error(error)))

    }
}

export default Article;