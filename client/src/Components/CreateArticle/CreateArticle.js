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

class CreateArticle extends Component<State> {

    constructor(props) {
        super(props);
        this.state = {
            headline: "",
            ingress: "",
            contents: "",
            category: "",
            image: "",
            importance: "",
            time: "",
            author: "",
            categories: []
        };
    }

    notifySuccess: void = () => {
        toast("Registrering vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifyFailure: void = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    handleChange: void = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    //BØR KANSKJE GJØRES SLIK AT MAN KOMMER RETT TIL ARTIKKELEN???
    save(): void {
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
            <div className="card" id="containerReg">
                <form>
                    <div className="form-group">
                        <label>Overskrift: </label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn overskrift"
                               name="headline" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Ingress: </label>
                        <textarea className="form-control" id="lname" rows="2"
                                  placeholder="Skriv inn ingressen" name="ingress" onChange={this.handleChange}
                                  required/>
                    </div>

                    <div className="form-group">
                        <label>Innhold:</label>
                        <textarea className="form-control" id="lname" rows="4"
                                  placeholder="Skriv inn innholdet" name="contents" onChange={this.handleChange}
                                  required/>
                    </div>

                    <div className="form-group">
                        <label>Bilde:</label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn bilde-URL"
                               name="image" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Column>
                                <label>Kategori: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <select className="btn btn-secondary" name="category" value={this.state.category}
                                        onChange={this.handleChange}>
                                    <option value="" selected disabled hidden>Velg en kategori</option>
                                    {this.state.categories.map((categories) => {
                                        return (
                                            <option value={categories.id}>{categories.name}</option>
                                        )
                                    })}
                                </select>
                            </Column>
                        </Row>
                        <div className="form-group">
                            <Row>
                                <Column>
                                    <label>Forfatter</label>
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
                                <label>Viktighet: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>1<input type="radio" value={1} name="importance"
                                               onChange={this.handleChange}/></label>
                                <label>2<input type="radio" value={2} name="importance"
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
                    categories: categories.data
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export default CreateArticle;