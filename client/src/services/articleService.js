// @flow
import Axios from "axios";

export class Article {
    id : number;
    overskrift: string;
    ingress: string;
    innhold: string;
    kategori: number;
    bilde: string;
    viktighet: number;
    tidspunkt: string;
    forfatter: string;

    constructor(overskrift: string, ingress: string, innhold: string, kategori: number, bilde: string, viktighet: number, forfatter: string) {
        this.overskrift = overskrift;
        this.ingress = ingress;
        this.innhold = innhold;
        this.kategori = kategori;
        this.bilde = bilde;
        this.viktighet = viktighet;
        this.forfatter = forfatter;
    }

}

class ArticleService {
    getAllArticles() : Promise<Article[]> {
        return Axios.get("http://localhost:8080/nyheter");
    }

    getAllArticlesFrontPage() : Promise<Article[]> {
        return Axios.get("http://localhost:8080/frontpage");
    }

    createNewArticle(article : Article) : Promise<void>{
        return Axios.post("http://localhost:8080/nyheter", article)
    }

    getOneArticle(id : number) : Promise<Article> {
        return Axios.get("http://localhost:8080/nyheter/" + id);
    }

    updateOneArticle(id : number, article : Article) : Promise<void> {
        return Axios.put("http://localhost:8080/nyheter/" + id, article)
    }
    
    updateLikes(id : number, likes: number) : Promise<void> {
        return Axios.put("http://localhost:8080/nyheter/likes/" + id, likes)
    }

    deleteOneArticle(id : number) : Promise<void> {
        return Axios.delete("http://localhost:8080/nyheter/" + id);
    }

    getAllLiveFeedArticles() : Promise<Article[]> {
        return Axios.get('http://localhost:8080/livefeed')
    }

    getAmountOfArticles(amount : number) : Promise<Article[]> {
        return Axios.get("http://localhost:8080/nyheter/finnAntall/" + amount);
    }

    getArticlesByCategory(id : number) : Promise<void> {
        return Axios.get("http://localhost:8080/nyheter/kategorier/" + id);
    }


}

export default ArticleService;