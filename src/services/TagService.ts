import { TagApi } from "../api/TagApi";
import type { CreateTagInterface } from "../interfaces/tag.interface";

export abstract class TagService {

    /** CREATE **/

    static async create(tag: CreateTagInterface) {
        return await TagApi.create(tag);
    }
}