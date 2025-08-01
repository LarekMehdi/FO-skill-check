<script lang="ts">
import type { PropType } from 'vue';
import type { OptionSelectInterface } from '../../interfaces/input.interface';

    export default {
        data() {
            return {}
        },
        props: {
            modelValue: {
                type: [String, Number, null],
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
            validation: {
                type: Object,
                required: false,
            },
            inputClass: {
                type: String,
                required: false,
                default: 'form-control'
            },
            optionClass: {
                type: String,
                required: false,
                default: ''
            },
            labelClass: {
                type: String,
                required: false,
                default: 'text-start d-block'
            },
            displayLabel: {
                type: Boolean,
                required: false,
                default: true,
            },
            options: {
                type: Array as PropType<OptionSelectInterface[]>,
                required: true,
            },
            inline: {
                type: Boolean,
                required: false,
                default: false
            },
            isRequired: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        emits: ['update:modelValue'],
    }
</script>

<template>
    <div :class="inline ? 'd-flex align-items-center gap-2' : ''">
        <label 
            v-if="displayLabel" 
            :for="name" 
            :class="labelClass"
            style="white-space: nowrap;"
        >
            {{ label }} {{ isRequired && displayLabel ? ' *' : '' }}
        </label>
        <select 
            :name="name"
            :class="inputClass"
            :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
                :class="optionClass"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>