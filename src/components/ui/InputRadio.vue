<script lang="ts">
    export default {
        data() {
            return { }
        },
        props: {
            modelValue: {
                type: [String, Number, null],
                required: true,
            },
            value: {
                type: [String, Number],
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
            inline: {
                type: Boolean,
                required: false,
                default: false
            },
            disabled: {
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
        <label v-if="displayLabel" :for="name" :class="[labelClass, inline ? 'mb-0' : '']">{{ label }}</label>
        <div :class="[inputClass, 'd-flex align-items-center justify-content-center']">
            <input
                type="radio"
                :name="name"
                class="circle-radio"
                :checked="modelValue === value"
                :disabled="disabled"
                @input="$emit('update:modelValue', value)"
            >
        </div>
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>
</template>


<style scoped>
    .circle-radio {
        appearance: none;
        width: 30px;
        height: 30px;
        border: 2px solid black;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        flex-shrink: 0;
    }
    .circle-radio:checked {
        background-color: #007bff;
        box-shadow: inset 0 0 0 4px white;
        border-color: #007bff;
    }
    .circle-radio:hover:not(:disabled) {
        border-color: #007bff;
    }
    .circle-radio:disabled {
        cursor: default;
    }
   
</style>