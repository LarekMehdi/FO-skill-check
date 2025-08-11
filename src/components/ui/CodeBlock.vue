<script lang="ts">
import hljs from 'highlight.js';


interface CodeBlockRefs {
  codeBlock?: HTMLElement;
}

interface Props {
  content: string;
  language: string;
}

type ThisTypeComponent = Props & {
  $refs: CodeBlockRefs;
};

    export default {
        mounted() {
            this.highlight();
        },
        props: {
            content: {
                type: String,
                required: true,
            },
            language: {
                type: String,
                required: false,
                default: 'bash',
            }
        },
        methods: {
            highlight(this: ThisTypeComponent) {
                const el = this.$refs.codeBlock;
                if (el) hljs.highlightElement(el);
            },
        },
        watch: {
            // 'content'(newVal: string, oldVal: string) {
            //     this.highlight();
            // }
        },
        components: {

        },
    }
</script>

<template>
    <pre class="bg-light rounded p-3 overflow-auto w-100">
        <code ref="codeBlock" :class="`language-${language}`" v-text="content"></code>
    </pre>
</template>

<style scoped>
    pre {
        font-family: monospace;
        font-size: 0.95rem;
        max-width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
        text-align: left;
        margin: 0;
    }
    code {
        display: block;
        text-align: left;
    }
</style>