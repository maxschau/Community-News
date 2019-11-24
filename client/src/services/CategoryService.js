// @flow

import Axios from "axios";
let ipadress : string = "10.24.78.189";

export class Category {
    id : number;
    name : string;

    constructor(name : string) {
        this.name = name;
    }
}


class CategoryService {
    getAll() : Promise<Category[]> {
        return Axios.get("http://" + ipadress + ":8080/categories");
    }

    getOne(id : number) : Promise<Category[]> {
        return Axios.get("http://" + ipadress + ":8080/categories/" + id);
    }
}

export default CategoryService;