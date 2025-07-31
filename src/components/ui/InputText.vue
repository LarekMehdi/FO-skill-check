<script lang="ts">
    export default {
        data() {
            return {

            }
        },
        props: {
            modelValue: {
                type: String,
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
            validation: {
                type: Object,
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
        <input
            type="text"
            :name="name"
            :placeholder="placeholder"
            :class="inputClass"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>