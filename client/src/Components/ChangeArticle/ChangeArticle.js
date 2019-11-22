// @flow

import React, {Component} from 'react'
import {Row, Column} from '../widgets';
import ArticleService, {Article} from '../../services/ArticleService';
import CategoryService from '../../services/CategoryService';
import {toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//Setting the types of the state
type State = {
    headline : string,
    ingress : string,
    contents : string,
    category: number,
    image : string,
    importance: number,
    time : string, 
    author : string,
    likes : number
}

type Props = {
    id : number
}

class ChangeArticle extends Component<State, Props> {
    constructor(props : any) {
        super(props);

        this.state = {
            headline:"",
            ingress : "",
            contents:"",
            category:"",
            image:"",
            importance:"",
            time:"",
            author : "",
            categories: []
        }
    }

    submitDelete = () => {
        confirmAlert({
        title: 'Bekreftelse av sletting',
        message: 'Er du sikker på at du vil slette artikkelen?',
        buttons: [
            {
            label: 'Ja',
            onClick : () => this.delete()
            },
            {
            label: 'Nei'
            }
        ]
        });
    }

    submitSave = () => {
        confirmAlert({
        title: 'Bekreftelse av oppdatering',
        message: 'Er du sikker på at du vil oppdatere artikkelen?',
        buttons: [
            {
            label: 'Ja',
            onClick : () => this.save()
            },
            {
            label: 'Nei'
            }
        ]
        });
    }

    notifyChange: void = () => {
        toast("Endring av artikkel vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    }

    notifyDelete: void = () => toast("Sletting gikk bra", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});

    save() : void {
        let articleService = new ArticleService();
        let newArticle = new Article(this.state.headline, this.state.ingress, this.state.contents, this.state.category, this.state.image, this.state.importance, this.state.author);
        articleService.updateOneArticle(this.props.match.params.id, newArticle)
            .then(() => {
                this.notifyChange();
                window.location.hash = '/articles/' + this.props.match.params.id
            })
            .catch((error) => console.error(error))
    }

    delete() : void {
        let articleService = new ArticleService();
        articleService.deleteOneArticle(this.props.match.params.id)
            .then(() => {
                this.notifyDelete();
                window.location.hash = '/home';
            })
            .catch((error) => console.error(error))
    }

    handleChange : void = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return(
            <div id = "containerReg">
                <form>
                    <div className="form-group">
                        <label>Overskrift: </label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn overskrift"
                               value = {this.state.headline}
                               name="headline" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Ingress:</label>
                        <textarea  className="form-control" id="lname" value = {this.state.ingress} rows="2"
                                   placeholder="Skriv inn innholdet" name="ingress" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Innhold:</label>
                        <textarea  className="form-control" id="lname" value = {this.state.contents} rows="3"
                               placeholder="Skriv inn innholdet" name="contents" onChange={this.handleChange} required/>
                    </div>


                    <div className="form-group">
                        <label>Bilde:</label>
                        <input type="text" className="form-control"
                               id="fname" value = {this.state.image} placeholder="Skriv inn bilde-URL"
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
                                <select className="btn btn-secondary" name="category" value= {this.state.category} onChange={this.handleChange}>
                                {this.state.categories.map((categories) => {
                                    return(
                                        <option value={categories.id} name = "category" selected={this.state.category === categories.id}>{categories.name}</option>
                                    )
                                })}
                                </select>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>Viktighet </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>1<input type="radio" name="importance" value={1} checked= {this.state.importance === 1} onChange={this.handleChange}/></label>
                                <label>2<input type="radio" name="importance" value={2} checked= {this.state.importance === 2} onChange={this.handleChange}/></label>

                            </Column>
                        </Row>
                    </div>
                    <Row>
                        <Column>
                            <button type="button" className="btn btn-secondary" onClick={() => this.submitSave()}>
                            Lagre
                            </button>
                        </Column>
                        <Column>
                            <button type="button" className="btn btn-danger" onClick={() => this.submitDelete() }> Slett </button>
                        </Column>
                    </Row>
                </form>
            </div>
        );
    }



    componentDidMount() {
            let articleService = new ArticleService();
            let categoryService = new CategoryService();

            categoryService.getAll()
                .then((categories) => {
                    this.setState({
                        categories: categories.data
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

            articleService.getOneArticle(this.props.match.params.id)
                .then((article) => {
                    this.setState({
                        headline: article.data[0].headline,
                        ingress: article.data[0].ingress,
                        contents: article.data[0].contents,
                        category: article.data[0].category,
                        image: article.data[0].image,
                        importance: article.data[0].importance,
                        time: article.data[0].time,
                        author: article.data[0].author
                    });
                    //window.scrollTo(0, document.body.scrollHeight)
                })
        
    }
}

export default ChangeArticle;