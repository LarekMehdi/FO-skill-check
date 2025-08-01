<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            modelValue: {
                type: Number,
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
        <label 
            v-if="displayLabel" 
            :for="name" 
            :class="labelClass"
            style="white-space: nowrap;"
        >
            {{ label }} {{ isRequired && displayLabel ? ' *' : '' }}
        </label>
        <!-- TODO: ajouter du texte dans l'input -->
        <input
            type="number"
            :name="name"
            :placeholder="placeholder"
            :class="`${inputClass}`"
            :value="modelValue"
            :disabled="disabled"
            @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        />
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>