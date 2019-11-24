// @flow
import React, {Component} from 'react';
import ArticleService, {Article} from '../../services/ArticleService';
import CategoryService, {Category} from '../../services/CategoryService';
import './CreateArticle.css'
import {Row, Column} from '../widgets';
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
    categories: Category[]
}

type Props = {}

class CreateArticle extends Component<Props, State> {


    constructor(props : any) {
        super(props);
        this.state = {
            headline: "",
            ingress: "",
            contents: "",
            category: 0,
            image: "",
            importance: 0,
            time: "",
            author: "",
            categories: []
        };
    }

    notifySuccess = () => {
        toast("Registrering vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    handleChange = (e : SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    //BØR KANSKJE GJØRES SLIK AT MAN KOMMER RETT TIL ARTIKKELEN???
    save() {
        let articleService = new ArticleService();
        let a1 = new Article(this.state.headline, this.state.ingress, this.state.contents, this.state.category, this.state.image, this.state.importance, this.state.author);
        articleService.createNewArticle(a1)
            .then(() => {
                this.notifySuccess();
                window.location.hash = '/home';
            })
            .catch((error) => {
                console.error(error);
                this.notifyFailure();
            })
    };

    render() {
        return (
            <div id="containerReg">
                <h1>Registrer ny artikkel </h1>
                <form>
                    <div className="form-group">
                        <label id={"labels"}>Overskrift: </label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn overskrift"
                               name="headline" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label id={"labels"}>Ingress: </label>
                        <textarea className="form-control" id="lname" rows="2"
                                  placeholder="Skriv inn ingressen" name="ingress" onChange={this.handleChange}
                                  required/>
                    </div>

                    <div className="form-group">
                        <label id={"labels"}>Innhold:</label>
                        <textarea className="form-control" id="lname" rows="4"
                                  placeholder="Skriv inn innholdet" name="contents" onChange={this.handleChange}
                                  required/>
                    </div>

                    <div className="form-group">
                        <label id={"labels"}>Bilde:</label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn bilde-URL"
                               name="image" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Column>
                                <label id={"labels"}>Kategori: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <select className="btn btn-secondary" name="category" value={this.state.category}
                                        onChange={this.handleChange}>
                                    <option defaultValue hidden id={"labels"}>Velg en kategori</option>
                                    {this.state.categories.map((categories) => {
                                        return (
                                            <option key = {categories.id} value={categories.id}>{categories.name}</option>
                                        )
                                    })}
                                </select>
                            </Column>
                        </Row>
                        <div className="form-group">
                            <Row>
                                <Column>
                                    <label id={"labels"}>Forfatter</label>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <input type="text" className="form-control"
                                           id="fname" placeholder="Hvem er du?"
                                           name="author" onChange={this.handleChange} required/>
                                </Column>
                            </Row>

                        </div>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Column>
                                <label id={"labels"}>Førsteside?: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>Ja<input type="radio" value={1} name="importance"
                                               onChange={this.handleChange}/></label>
                                <label>Nei<input type="radio" value={2} name="importance"
                                               onChange={this.handleChange}/></label>
                            </Column>
                        </Row>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => this.save()}>
                        Registrer sak
                    </button>
                </form>
            </div>
        );
    }

    componentDidMount() {
        let categoryService = new CategoryService();
        categoryService.getAll()
            .then((categories) => {
                this.setState({
                    categories: categories
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export default CreateArticle;