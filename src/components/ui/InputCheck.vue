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
            }
        },
        emits: ['update:modelValue'],
    }
</script>

<template>
    <div :class="inline ? 'd-flex align-items-center gap-2' : ''">
        <label v-if="displayLabel" :for="name" :class="[labelClass, inline ? 'mb-0' : '']">{{ label }}</label>
        <input
            type="checkbox"
            :name="name"
            :class="`${inputClass}`"
            :checked="modelValue"
            :disabled="disabled"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        >
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>