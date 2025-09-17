<script lang="ts">
import type { PropType } from 'vue';
import InputText from './InputText.vue';

    export default {
        props: {
            modelValue: {
                type: [String, null],
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
            },
            getResultLabel: {
                type: Function as PropType<(item: any) => string>,
            },
            onSelect: {
                type: Function as PropType<(item: any) => void>,
            },
        },
        data(): {query: string, results: any[], displayDropbox: boolean,} 
        {
            return {
                query: '',
                results: [],
                displayDropbox: false,
            }
        },
        methods: {
            async search() {

                console.log('appel API');

                if (!this.apiCall) return;
                this.results = await this.apiCall(this.query);
                this.displayDropbox = this.results.length > 0;
            },
            handleSelect(item: any) {
                if (this.onSelect) this.onSelect(item);
                this.query = this.getResultLabel ? this.getResultLabel(item) : '';
                
                this.displayDropbox = false;
                this.results = [];
            }
        },
        watch: {
            'query'(newVal, oldVal) {
                if (newVal && newVal !== oldVal) this.search();
            }
        },
        components: {
            InputText,
        },
    }
</script>

<template>
    <section>
        <InputText
            v-model="query"
            :name="name"
            :placeholder="placeholder"
            :label="label"
            :displayLabel="displayLabel"
            :inputClass="inputClass"
            :inline="inline"
        />
        <ul v-if="displayDropbox" :class="listClass">
            <li 
                v-for="(item, index) in results" 
                :key="index" 
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer bg-zinc-100"
                @click="handleSelect(item)"
            >
                {{ getResultLabel ? getResultLabel(item) : '' }}
            </li>
        </ul>
    </section>
</template>