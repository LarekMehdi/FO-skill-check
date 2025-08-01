<script lang="ts">
    export default {
        data() {
            return {}
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
            isRequired: {
                type: Boolean,
                required: false,
                default: false,
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
    <label v-if="displayLabel" :for=name :class="labelClass">{{ label }} {{ isRequired && displayLabel ? ' *' : '' }}</label>
    <input
        type="password"
        :name="name"
        :placeholder="placeholder"
        :class="inputClass"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>