<script lang="ts">
    export default {
        data() {
            return { }
        },
        props: {
            modelValue: {
                type: Boolean,
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
            isCircle: {
                type: Boolean,
                required: false,
                default: false,
            },
            isSmall: {
                type: Boolean,
                required: false,
                dafault: false,
            }
        },
        emits: ['update:modelValue'],
    }
</script>

<template>
    <div :class="inline ? 'd-flex align-items-center gap-2' : ''">
        <label v-if="displayLabel" :for="name" :class="[labelClass, inline ? 'mb-0' : '']">{{ label }}</label>
        <div :class="[inputClass, 'd-flex align-items-center justify-content-center']">
            <input
                type="checkbox"
                :name="name"
                :class="[isCircle ? 'circle-checkbox' : isSmall ? 'square-checkbox-small' : 'square-checkbox']"
                :checked="modelValue"
                :disabled="disabled"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
            >
        </div>
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>
</template>


<style scoped>
    .circle-checkbox {
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
    .circle-checkbox:checked {
        background-color: #007bff;
        box-shadow: inset 0 0 0 4px white;
        border-color: #007bff;
    }
    .circle-checkbox:hover:not(:disabled) {
        border-color: #007bff;
    }
    .circle-checkbox:disabled {
        cursor: default;
    }
    
    .square-checkbox {
        appearance: none;
        width: 30px;
        height: 30px;
        border: 2px solid black;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        flex-shrink: 0;
        background-color: white;
    }

    .square-checkbox:checked {
        background-color: #007bff;
        border-color: #007bff;
    }

    .square-checkbox:checked::after {
        content: '';
        position: absolute;
        left: 7px;
        top: 3px;
        width: 8px;
        height: 14px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }

    .square-checkbox:hover:not(:disabled) {
        border-color: #007bff;
    }

    .square-checkbox:disabled {
        cursor: default;
    }

    .square-checkbox-small {
        appearance: none;
        width: 15px;
        height: 15px;
        border: 2px solid black;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        flex-shrink: 0;
        background-color: white;
    }

    .square-checkbox-small:checked {
        background-color: #007bff;
        border-color: #007bff;
    }

    .square-checkbox-small:checked::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .square-checkbox-small:hover:not(:disabled) {
        border-color: #007bff;
    }

    .square-checkbox-small:disabled {
        cursor: default;
    }
    
   
</style>