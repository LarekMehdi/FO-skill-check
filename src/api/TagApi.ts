import type { CreateTagInterface, TagInterface } from "../interfaces/tag.interface";
import { useApi } from "./useApi";

export abstract class TagApi {

    /** FIND **/

    static async findById(id: number) {
        try {
            const { data } = await useApi().get(`tags/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** FIND ALL **/

    static async findAll() {
        try {
            const { data } = await useApi().get(`tags`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** UPDATE **/

    static async update(tag: TagInterface) {
        try {
            const { data } = await useApi().put(`tags/${tag.id}`, tag);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** CREATE **/

    static async create(tag: CreateTagInterface) {
        try {
            const { data } = await useApi().post(`tags`, tag);
            return data;
        }
        catch(error: unknown) {
            console.error(error);
            throw error;
        }
    }

    /** DELETE **/

    static async deleteById(id: number) {
        try {
            const { data } = await useApi().delete(`tags/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}