// @flow

import React, {Component} from 'react';
import {Comment, CommentsService} from '../../services/CommentsService';
import {Column, Row} from '../../Components/widgets';
import CommentSingle from '../Comment/CommentSingle';
import './CommentView.css';


type State = {
    comments: Comment[],
    limitPerPage: number,
    maxPage: number,
    commentPage: number,
    hasComments: boolean,
    hasCommentsExceed : boolean
}

type Props = {
    id: number;
}


class CommentView extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            limitPerPage: 4,
            maxPage: -1,
            commentPage: 0,
            hasComments: false,
            hasCommentsExceed : false
        }
    }

    openNewComment = () => {
        let show = (document.getElementById("containerNewComment"): any);
        let style = window.getComputedStyle(show);
        let btn = (document.getElementById("btnComment"): any);
        if (style.display === "none") {
            show.style.display = "block";
            btn.innerHTML = "Fjern ny kommentarer";
        } else {
            show.style.display = "none";
            btn.innerHTML = "Skriv ny kommentarer";
        }

    };

    handleNext = () => {
        let number = (this.state.commentPage + 1) % (this.state.maxPage);
        this.setState({
            commentPage: number
        })
    };

    handleDown = () => {
        if (this.state.commentPage > 0) {
            let number = this.state.commentPage - 1;
            this.setState({
                commentPage: number
            })
        }
    };

    addComment = () => {
        let commentsService = new CommentsService();
        let name = (document.getElementById("inpName"): any).value;
        let comment = (document.getElementById("inpComment"): any).value;
        let c = new Comment(name, comment, this.props.id);
        commentsService.createComment(c)
            .then(() => {
                /* HMMMMM */
                (document.getElementById("inpName"): any).value = "";
                (document.getElementById("inpComment"): any).value = "";
                this.openNewComment();
                this.componentDidMount();
                /* HMMMMM */

                /* HMMMMM */

            })
            .catch((error) => {
                console.error(error);
            })
    }


    render() {
        return (
            <div>
                <Row>
                    <Column>
                        <h4>Kommentarer</h4>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <button className="btn btn-dark" onClick={() => this.openNewComment()} id="btnComment">Skriv ny
                            kommentar
                        </button>
                        <hr/>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <div id="containerNewComment">
                            <form>
                                <div className="form-group">
                                    <label>Ditt navn:</label>
                                    <input type="text" className="form-control"
                                           id="inpName" placeholder="Skriv navnet ditt"
                                           name="name" required/>
                                </div>
                                <div className="form-group">
                                    <label>Din kommentar:</label>
                                    <textarea className="form-control"
                                              id="inpComment" placeholder="Din kommentar..."
                                              name="kommentar" required/>
                                </div>
                                <button type="button" className="btn btn-dark" onClick={() => this.addComment()}>Publiser
                                </button>
                            </form>
                        </div>
                    </Column>
                </Row>
                <div className="containerComments" style={{display: this.state.hasComments ? 'block' : 'none'}}>
                    {this.state.comments.slice((this.state.commentPage * this.state.limitPerPage), this.state.commentPage * 4 + 4).map((comment) => {
                        return (
                            <CommentSingle key={comment.id} name={comment.name} comment={comment.comment}
                                           time={comment.time}/>
                        )
                    })}
                    <div id="pagination" style={{display : this.state.hasCommentsExceed ? 'block' : 'none'}}>
                        <a onClick={() => this.handleDown()}>Forrige</a>
                        <a onClick={() => this.handleNext()}>Neste</a>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let commentsService = new CommentsService();
        commentsService.getCommentsByArticle(this.props.id)
            .then((comment) => {
                if (comment.length > 0) {
                    this.setState({
                        hasComments: true
                    })
                }
                if (comment.length > 4) {
                    this.setState( {
                        hasCommentsExceed : true
                    })
                }
                this.setState({
                    comments: comment,
                    maxPage: Math.ceil((comment.length / this.state.limitPerPage))
                });
            })
            .catch((error) => {
                //console.error(error);
            })
    }
}

export default CommentView;