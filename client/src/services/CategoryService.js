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
        return Axios.get('http://localhost:8080/categories');
    }

    getOne(id : number) : Promise<Category> {
        return Axios.get('http://localhost:8080/categories/' + id);
    }
}

export default CategoryService;