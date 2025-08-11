<script lang="ts">
import hljs from 'highlight.js';

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
        data(): {localCode: string} {
            return {
                localCode: '',
            }
        },
        computed: {
            highlightedCode() {
                if (this.localCode.trim() === '') {
                    return "<br>";
                }
                try {
                    return hljs.highlight(this.localCode, { language: this.language }).value;
                } catch(e: unknown) {
                    return hljs.highlightAuto(this.localCode).value;
                }
            },
        },
        emits: ['update:modelValue'],
        watch: {
            'localCode'(newVal: string) {
                this.$emit('update:modelValue', newVal);
            },
            'modelValue'(newVal: string) {
                if (newVal !== this.localCode) {
                    this.localCode = newVal;
                }
            }
        },
        methods: {
            syncScroll(event: Event) {
                const textarea = event.target as HTMLTextAreaElement;
                const pre = this.$el.querySelector('pre.hljs');
                if (pre) {
                    pre.scrollTop = textarea.scrollTop;
                    pre.scrollLeft = textarea.scrollLeft;
                }
            },
        },
    }
</script>

<template>
  <div class="editor-container">

    <pre class="hljs" v-html="highlightedCode"></pre>

    <textarea
      v-model="localCode"
      class="code-input"
      spellcheck="false"
      @scroll="syncScroll"
    >
    </textarea>
  </div>

</template>

<style scoped>
.editor-container {
  position: relative;
  font-family: monospace;
  font-size: 14px;
  background: #0d1117;
  border-radius: 6px;
  overflow: hidden;
}

/* Code hightlighté */
.editor-container pre {
  margin: 0;
  padding: 10px;
  overflow: auto;
  min-height: 200px;
}

.editor-container pre.hljs,
.editor-container .code-input {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  padding: 10px;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  box-sizing: border-box;
}

/* Textarea transparent par-dessus */
.editor-container .code-input {
  position: absolute;
  inset: 0;
  padding: 10px;
  background: transparent;
  color: transparent;
  caret-color: white;
  border: none;
  resize: none;
  outline: none;
  white-space: pre-wrap;
  overflow: auto;
}

.editor-container pre.hljs {
  text-align: left;
  white-space: pre-wrap;
}
</style>