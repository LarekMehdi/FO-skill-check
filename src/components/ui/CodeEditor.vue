<!-- <script lang="ts">
//import '@codemirror/view/style.css';
import { lineNumbers } from '@codemirror/view';
import { highlightActiveLineGutter } from '@codemirror/view';
import { highlightActiveLine } from '@codemirror/view';
import { drawSelection } from '@codemirror/view';
import { indentOnInput } from '@codemirror/language';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { defaultKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';


import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
// @ts-ignore
import { java } from '@codemirror/lang-java';
// @ts-ignore
import { html } from '@codemirror/lang-html';
// @ts-ignore
import { css } from '@codemirror/lang-css';
// @ts-ignore
import { sql } from '@codemirror/lang-sql';
import { history, historyKeymap } from '@codemirror/commands';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';


    export default {
        props: {
            modelValue: {
                type: String,
                required: true,
            },
            language: {
                type: String,
                required: false,
                default: 'javascript',
            }
        },
        emits: ['update:modelValue'],
        mounted() {
            if (!this.$refs.editorDiv) return;
            const state = this.initEditorState();
            this.initView(state);
        },
        beforeUnmount() {
            if (this.view) this.view.destroy();
        },
        data(): {editorDiv: HTMLElement | null, view: EditorView | null} {
            return {
                editorDiv: null,
                view: null,
            }
        },
        
        methods: {
            initEditorState() {
                return EditorState.create({
                    doc: this.modelValue,
                    extensions: [
                        lineNumbers(),
                        highlightActiveLineGutter(),
                        highlightActiveLine(),
                        history(),
                        foldGutter(),
                        drawSelection(),
                        keymap.of(historyKeymap),
                        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                        indentOnInput(),
                        this.getLanguageExtension(),
                        oneDark,
                        keymap.of([
                            ...defaultKeymap,
                            ...historyKeymap,
                            ...foldKeymap
                        ]),
                        EditorView.updateListener.of(update => {
                            if (update.docChanged) {
                                const value = update.state.doc.toString();
                                this.$emit('update:modelValue', value);
                            }
                        }),
                    ],
                });
            },
            initView(state: EditorState) {
                if (!this.$refs.editorDiv) return;
                this.view = new EditorView({
                    state,
                    parent: this.$refs.editorDiv as HTMLElement,
                })
            },
            getLanguageExtension() {
                switch(this.language.trim().toLowerCase()) {
                    case 'javascript': return javascript();
                    case 'typescript': return javascript({ typescript: true });
                    case 'java': return java();
                    case 'sql': return sql();
                    case 'html': return html();
                    case 'css': return css();
                    default: return javascript();
                }
            },
        },
        watch: {
            'modelValue'(newVal: string, oldVal: string) {
                if (this.view) {
                    const currentVal = this.view.state.doc.toString();
                    if (newVal !== currentVal) {
                        this.view.dispatch({
                            changes: { from: 0, to: currentVal.length, insert: newVal}
                        });   
                    }
                }
            }
        },
        components: {

        },
    }
</script>

<template>
    <div ref="editorDiv" class="code-editor">

    </div>
</template>

<style scoped>
    .code-editor {
        border: 1px solid #ddd;
        min-height: 150px;
    }
</style> -->