// @flow

import Axios from "axios"

export class Comment {
    id : number;
    name : string;
    comment : string;
    article : id;

    constructor(name : string, comment : string, article : number) {
        this.name = name;
        this.comment = comment;
        this.article = article;
    }
}

export class CommentsService {
    
    getCommentsByArticle(id : number) : Promise<Comment[]> {
        return Axios.get("http://localhost:8080/comments/" + id);
    }
    

    createComment(comment : Comment) : Promise<void> {
        return Axios.post("http://localhost:8080/comments", comment);
    }
}