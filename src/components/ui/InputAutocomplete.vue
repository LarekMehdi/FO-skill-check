<script lang="ts">
import { nextTick, type PropType } from 'vue';
import InputText from './InputText.vue';

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
            listItemClass: {
                type: String,
                required: false,
                default: ''
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
            apiCall: {
                type: Function as PropType<(query: string) => Promise<any[]>>,
                required: true,
            },
            getResultLabel: {
                type: Function as PropType<(item: any) => string>,
                required: true,
            },
            getResultField: {
                type: Function as PropType<(item: any) => any>,
                required: true,
            },
        },
        data(): {query: string, results: any[], displayDropbox: boolean, isSelecting: boolean} 
        {
            return {
                query: '',
                results: [],
                displayDropbox: false,
                isSelecting: false,
            }
        },
        methods: {
            async search() {
                if (!this.apiCall || this.isSelecting) return;
                this.results = await this.apiCall(this.query);
                this.displayDropbox = this.results.length > 0;
            },
            handleSelect(item: any) {
                this.isSelecting = true;
                this.query = this.getResultLabel ? this.getResultLabel(item) : '';
                this.$emit('update:modelValue', this.getResultField ? this.getResultField(item) : item);
                
                this.displayDropbox = false;
                this.results = [];

                nextTick(() => {
                    this.isSelecting = false;
                });
            }
        },
        watch: {
            'query'(newVal, oldVal) {
                if (!newVal) {
                    this.results = [];
                    this.displayDropbox = false;

                }
                if (newVal !== oldVal) this.search();
            },
            'modelValue'(newVal) {
                if (!newVal) {
                    this.query = '';
                    this.results = [];
                    this.displayDropbox = false;
                }
            }
        },
        emits: ['update:modelValue'],
        components: {
            InputText,
        },
    }
</script>

<template>
    <section class="position-relative">
        <InputText
            v-model="query"
            :name="name"
            :placeholder="placeholder"
            :label="label"
            :displayLabel="displayLabel"
            :inputClass="inputClass"
            :inline="inline"
        />
        <ul v-if="displayDropbox" :class="`dropdown-menu show w-100 ${listClass}`">
            <li 
                v-for="(item, index) in results" 
                :key="index" 
            >
                <button
                    type="button"
                    :class="`dropdown-item ${listItemClass}`"
                    @click="handleSelect(item)"
                >
                    {{ getResultLabel ? getResultLabel(item) : '' }}
                </button>
                
            </li>
        </ul>
    </section>
</template>