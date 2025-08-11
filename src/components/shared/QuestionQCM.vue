<script lang="ts">
import type { TakeQuestionInterface } from '../../interfaces/question.interface';
import type { PropType } from 'vue';
import InputTextArea from '../ui/InputTextArea.vue';
import AnswerQCM from './AnswerQCM.vue';
import type { SubmitTestInterface } from '../../interfaces/test.interface';
import CodeBlock from '../ui/CodeBlock.vue';

    export default {
        data(): {
            selectedAnswerIds: number[],
        } {
            return {
                selectedAnswerIds: [],
            }
        },
        props: {
            modelValue: {
                type: Object as PropType<SubmitTestInterface>
            },
            question: {
                type: Object as PropType<TakeQuestionInterface>,
                required: true,
            },
        },
        methods: {
            onAnswerUpdate(ids: number[]) {
                this.selectedAnswerIds = ids;

                this.$emit('update:modelValue', { questionId: this.question.id, selectedAnswerIds: [...ids]});
            },
        },
        components: {
            InputTextArea,
            AnswerQCM,
            CodeBlock,
        },
        emits: ['update:modelValue'],
    }
</script>

<template>
    <article>
        <section class="mb-3">
            <InputTextArea
                v-model="question.content"
                name="content"
                placeholder="Question"
                :displayLabel="false"
                :cols="100"
                :disabled="true"
                inputClass="bg-light rounded"
            />
           
            <!-- TODO: ajouter un type language sur les tags -->
            <CodeBlock 
                v-if="question.code"
                :content="question.code" 
                language="java" 
            />
        </section>
        <section>
            <AnswerQCM
                v-model="selectedAnswerIds"
                :answers="question.choices"
                @update:model-value="onAnswerUpdate"
            />
        </section>
        
        
    </article>
</template>