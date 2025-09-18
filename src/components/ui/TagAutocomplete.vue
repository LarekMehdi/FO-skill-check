<script lang="ts">
import type { TagInterface } from '../../interfaces/tag.interface';
import { TagService } from '../../services/TagService';
import InputAutocomplete from './InputAutocomplete.vue';

    export default {
        props: {
            modelValue: {
                type: [String, Number, Boolean, null],
                required: true,
            },
            label: {
                type: String,
                default: '',
                required: false,
            },
            name: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                default: '',
                required: false,
            },
            inputClass: {
                type: String,
                required: false,
                default: 'form-control'
            },
            labelClass: {
                type: String,
                required: false,
                default: 'text-start d-block'
            },
            listClass: {
                type: String,
                required: false,
                default: ''
            },
        },
        methods: {
            async findAllByLabel(query: string) {
                return await TagService.findAllByLabel(query);
            }
        },
        emits: ['update:modelValue'],
        components: {
            InputAutocomplete,
        },  
    }
</script>

<template>
    <InputAutocomplete
        :modelValue="modelValue"
        :label="label"
        :name="name"
        :placeholder="placeholder"
        :inputClass="inputClass"
        :labelClass="labelClass"
        :listClass="listClass"
        :apiCall="(query: string) => findAllByLabel(query)"
        :getResultLabel="(t: TagInterface) => t.label"
        :getResultField="(t: TagInterface) => t.id"
        @update:modelValue="$emit('update:modelValue', $event)"
        
    />

</template>