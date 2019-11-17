// @flow
import React, {Component} from 'react';
import ArticleService, {Article} from '../../services/articleService';
import {Column, Row, Card} from '../../Components/widgets';
import {Link} from "react-router-dom";
import {faThumbsUp, faThumbsDown }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Artikkel.css';
import {toast} from 'react-toastify';


type Props = {
    overskrift: string,
    ingress: string,
    innhold: string,
    kategori: number,
    bilde: string,
    viktighet:number,
    tidspunkt: string,
    forfatter: string,
    likes : number,
    liked : boolean
}

class Artikkel extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            overskrift:"",
            ingress: "",
            innhold:"",
            kategori:"",
            bilde:"",
            viktighet:"",
            tidspunkt:"",
            forfatter:"",
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
    /*
    handleThumbsDown = () => {
        let number = this.state.likes - 1;
        this.setState({
            likes: number
        });
        this.updateLikes();
    };
    */

    updateLikes = () => {
        let articleService = new ArticleService();
        console.log("likes from state: " + this.state.likes);
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
                            <img src={this.state.bilde} alt = {this.state.overskrift} id="img" />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h1>{this.state.overskrift}</h1>
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
                            <h5 className={"tidTekst float-left"}><b>Publisert: </b> {this.state.tidspunkt} av {this.state.forfatter}</h5>
                        </Column>
                        <Column width={3}>
                            <span><p onClick={() => this.handleThumbsUp()}><FontAwesomeIcon id="iconLikes" icon={faThumbsUp}/>   {this.state.likes}</p></span>
                        </Column>
                        {/*}
                        <Column>
                            <p onClick={() => this.handleThumbsDown()}><FontAwesomeIcon icon={faThumbsDown} size={"2x"}/></p>
                        </Column>{*/}

                    </Row>
                    <Row>
                        <Column>
                            <h5>{this.state.innhold}</h5>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Link to={"/nyheter/endre/" + this.props.match.params.id}><button className="btn btn-secondary">Endre </button></Link>
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
                let tidspunkt = article.data[0].tidspunkt.substring(0, article.data[0].tidspunkt.length-1);
                tidspunkt = tidspunkt.replace("T", " ");
                tidspunkt = tidspunkt.replace('.000', "");
                this.setState({
                    overskrift : article.data[0].overskrift,
                    ingress: article.data[0].ingress,
                    innhold:article.data[0].innhold,
                    kategori:article.data[0].kategori,
                    bilde:article.data[0].bilde,
                    viktighet:article.data[0].viktighet,
                    tidspunkt: tidspunkt,
                    forfatter: article.data[0].forfatter,
                    likes : article.data[0].likes
                });
                console.log(article.data[0].likes);
            })
            .catch((error => console.error(error)))

    }
}

export default Artikkel;