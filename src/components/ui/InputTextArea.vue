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
            rows: {
                type: Number,
                required: false,
                default: 0,
            },
            cols: {
                type: Number,
                required: false,
                default: 20
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
            }
        },
        emits: ['update:modelValue'],
        watch: {
            modelValue() {
                this.autoResize();
            }
        },
        mounted() {
            this.autoResize();
        },
        methods: {
            autoResize() {
                if (this.rows !== 0) return;
                const el = this.$refs.textareaRef as HTMLTextAreaElement | undefined;
                if (!el) return;

                el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
            },
            onInput(event: Event) {
                const target = event.target as HTMLTextAreaElement;
                this.$emit('update:modelValue', target.value);
                this.autoResize();
            }
        }
    }
</script>

<template>
    <label v-if="displayLabel" :for="name" :class="labelClass">{{ label }} {{ isRequired && displayLabel ? ' *' : '' }}</label>
    <textarea
        ref="textareaRef"
        :name="name"
        :placeholder="placeholder"
        :class="inputClass"
        :value="modelValue"
        :rows="rows === 0 ? 1 : rows"
        :cols="cols"
        :disabled="disabled"
        @input="onInput"
    >
    </textarea>
    <small v-if="validation?.$dirty && validation?.$error" class="text-danger">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>