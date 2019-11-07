// @flow

import Axios from "axios";

export class Kategori {
    id : number;
    navn : string;

    constructor(navn : string) {
        this.navn = navn;
    }
}


class KategoriService {
    getAll() : Promise<Kategori[]> {
        return Axios.get('http://localhost:8080/kategorier');
    }

    getOne(id : number) : Promise<Kategori> {
        return Axios.get('http://localhost:8080/kategorier/' + id);
    }
}

export default KategoriService;