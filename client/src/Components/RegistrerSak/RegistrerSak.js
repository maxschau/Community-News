// @flow
import React, {Component} from 'react';
import ArticleService, {Article} from '../../services/articleService';
import KategoriService from '../../services/kategoriService';
import './RegistrerSak.css'
import {Row, Column} from '../widgets';
import {toast} from 'react-toastify';


import createHashHistory from 'history/createHashHistory';

//const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

type State = {
    overskrift: string,
    ingress: string,
    innhold: string,
    kategori: number,
    bilde: string,
    viktighet: number,
    tidspunkt: string,
    forfatter: string,
    kategorier: Kategori[]
}

class RegistrerSak extends Component<State> {

    constructor(props) {
        super(props);
        this.state = {
            overskrift: "",
            ingress: "",
            innhold: "",
            kategori: "",
            bilde: "",
            viktighet: "",
            tidspunkt: "",
            forfatter: "",
            kategorier: []
        };
    }

    notifySuccess: void = () => {
        toast("Registrering vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    }

    notifyFailure: void = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    handleChange: void = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    //BØR KANSKJE GJØRES SLIK AT MAN KOMMER RETT TIL ARTIKKELEN???
    save(): void {
        let articleService = new ArticleService();
        let a1 = new Article(this.state.overskrift, this.state.ingress, this.state.innhold, this.state.kategori, this.state.bilde, this.state.viktighet, this.state.forfatter);
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
                               name="overskrift" onChange={this.handleChange} required/>
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
                                  placeholder="Skriv inn innholdet" name="innhold" onChange={this.handleChange}
                                  required/>
                    </div>

                    <div className="form-group">
                        <label>Bilde:</label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn bilde-URL"
                               name="bilde" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Column>
                                <label>Kategori: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <select className="btn btn-secondary" name="kategori" value={this.state.kategori}
                                        onChange={this.handleChange}>
                                    <option value="" selected disabled hidden>Velg en kategori</option>
                                    {this.state.kategorier.map((kategorier) => {
                                        return (
                                            <option value={kategorier.id}>{kategorier.navn}</option>
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
                                           name="forfatter" onChange={this.handleChange} required/>
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
                                <label>1<input type="radio" value={1} name="viktighet"
                                               onChange={this.handleChange}/></label>
                                <label>2<input type="radio" value={2} name="viktighet"
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
        let kategoriService = new KategoriService();
        kategoriService.getAll()
            .then((kategorier) => {
                this.setState({
                    kategorier: kategorier.data
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export default RegistrerSak;