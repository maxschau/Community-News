// @flow

import React, {Component} from 'react';
import {Comment, CommentsService} from '../../services/CommentsService';
import {Column, Row, Card} from '../../Components/widgets';
import CommentSingle from '../Comment/CommentSingle';
import './CommentView.css';


type State = {
    comments : Comment[] 
}

type Props = {}

type props= {}

class CommentView extends Component<State, Props> {
    constructor(props : any) {
        super(props);
        this.state = {
            comments : [],
            limitPerPage : 4,
            maxPage : "",
            commentPage : 0
        }
    }

    openNewComment = () => {
        let show  =  document.getElementById("containerNewComment");
        let style = window.getComputedStyle(show);
        let btn = document.getElementById("btnComment");
        if (style.display == "none") {
            show.style.display = "block";
            btn.innerHTML = "Fjern ny kommentarer";
        } else {
            show.style.display = "none";
            btn.innerHTML = "Skriv ny kommentarer";
        }

    }

    handleNext = () => {
        let number = (this.state.commentPage + 1)%(this.state.maxPage);
        this.setState({
            commentPage : number
        })
    }

    handleDown = () => {
        if (this.state.commentPage > 0) {
            let number = this.state.pageNumber - 1;
            this.setState({
                commentPage : number
            })
        }
       
    }

    addComment = () => {
        let commentsService = new CommentsService();
        let name = document.getElementById("inpName").value;
        let comment = document.getElementById("inpComment").value;
        let c = new Comment(name, comment, this.props.id);
        commentsService.createComment(c)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        return(
            <div>
                <Row>
                    <Column>
                        <h4>Kommentarer</h4>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <button onClick={() => this.openNewComment()} id="btnComment">Skriv ny kommentar </button>
                        <hr/>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <div id = "containerNewComment">
                            <form>
                                <div className="form-group">
                                    <label>Ditt navn:</label>
                                    <input type="text" className="form-control"
                                        id="inpName" placeholder="Skriv navnet ditt"
                                        name="name"required/>
                                </div>
                                <div className="form-group">
                                    <label>Din kommentar:</label>
                                    <textarea className="form-control"
                                        id="inpComment" placeholder="Din kommentar..."
                                        name="kommentar"required/>
                                </div>
                                <button type="button" onClick={() => this.addComment()}>Lagre</button>
                            </form>
                        </div>
                    </Column>
                </Row>
                <div className="containerComments">
                    {this.state.comments.slice((this.state.commentPage*this.state.limitPerPage), this.state.commentPage*4 + 4).map((comment) => {
                        return(
                            <CommentSingle name={comment.name} comment = {comment.comment} />
                        )
                    })}
                </div>
                <Row>
                    <Column><p onClick={() => this.handleDown()}>Forrige</p></Column>
                    <Column>{this.state.commentPage + 1}</Column>
                    <Column><p onClick={() => this.handleNext()}>Neste</p></Column>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        let commentsService = new CommentsService();
        commentsService.getCommentsByArticle(this.props.id)
            .then((comment) => {
                this.setState({
                    comments : comment.data,
                    maxPage : Math.ceil((comment.data.length / this.state.limitPerPage))
                });
                console.log("Maxpage comments: " + this.state.maxPage);
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export default CommentView;