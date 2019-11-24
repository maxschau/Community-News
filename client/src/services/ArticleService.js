// @flow
import Axios from "axios";
Axios.interceptors.response.use(response => response.data);


export class Article {
    id : number;
    headline: string;
    ingress: string;
    contents: string;
    category: number;
    image: string;
    importance: number;
    time: string;
    author: string;
    likes : number;

    constructor(headline: string, ingress: string, contents: string, category: number, image: string, importance: number, author: string) {
        this.headline = headline;
        this.ingress = ingress;
        this.contents = contents;
        this.category = category;
        this.image = image;
        this.importance = importance;
        this.author = author;
    }

}

export class ArticleService {
    getAllArticles() : Promise<Article[]> {
        return Axios.get("http://localhost:8080/articles");
    }

    getAllArticlesFrontPage() : Promise<Article[]> {
        return Axios.get("http://localhost:8080/frontpage");
    }

    createNewArticle(article : Article) : Promise<void>{
        return Axios.post("http://localhost:8080/articles", article)
    }

    getOneArticle(id : number) : Promise<Article[]> {
        return Axios.get("http://localhost:8080/articles/" + id);
    }

    updateOneArticle(id : number, article : Article ): Promise<void> {
        return Axios.put("http://localhost:8080/articles/" + id, article)
    }

    updateLikes(id : number) : Promise<void> {
        return Axios.put("http://localhost:8080/articles/likes/" + id)
    }

    deleteOneArticle(id : number) : Promise<void> {
        return Axios.delete("http://localhost:8080/articles/" + id);
    }

    getAllLiveFeedArticles() : Promise<Article[]> {
        return Axios.get("http://localhost:8080/livefeed");
    }

    getAmountOfArticles(amount : number) : Promise<Article[]> {
        return Axios.get("http://localhost:8080/articles/finnAntall/" + amount);
    }

    getArticlesByCategory(id : number) : Promise<Article[]> {
        return Axios.get("http://localhost:8080/articles/categories/" + id);
    }


}

export default ArticleService;