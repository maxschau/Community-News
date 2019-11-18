// @flow

import Axios from "axios";

export class Category {
    id : number;
    name : string;

    constructor(name : string) {
        this.name = name;
    }
}


class CategoryService {
    getAll() : Promise<Category[]> {
        return Axios.get('http://localhost:8080/kategorier');
    }

    getOne(id : number) : Promise<Category> {
        return Axios.get('http://localhost:8080/kategorier/' + id);
    }
}

export default CategoryService;