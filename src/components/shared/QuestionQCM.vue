<script lang="ts">
import type { TakeQuestionInterface } from '../../interfaces/question.interface';
import type { PropType } from 'vue';
import InputTextArea from '../ui/InputTextArea.vue';
import AnswerQCM from './AnswerQCM.vue';
import type { SubmitTestInterface } from '../../interfaces/test.interface';

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

                const otherAnswers = this.modelValue?.answers.filter((a) => a.questionId !== this.question.id);
                otherAnswers?.push({ questionId: this.question.id, selectedAnswerIds: ids});

                this.$emit('update:modelValue', { questionId: this.question.id, selectedAnswerIds: ids});
            },
        },
        components: {
            InputTextArea,
            AnswerQCM,
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