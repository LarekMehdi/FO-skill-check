import { TagApi } from "../api/TagApi";
import type { CreateTagInterface, TagInterface } from "../interfaces/tag.interface";

export abstract class TagService {

    /** FIND **/

    static async findById(id: number) {
        return await TagApi.findById(id);
    }

    /** FIND ALL **/

    static async findAll() {
        return await TagApi.findAll();
    }

    /** UPDATE **/

    static async update(tag: TagInterface) {
        return await TagApi.update(tag);
    }

    /** CREATE **/

    static async create(tag: CreateTagInterface) {
        return await TagApi.create(tag);
    }

    /** DELETE **/

    static async deleteById(id: number) {
        return await TagApi.deleteById(id);
    }
}