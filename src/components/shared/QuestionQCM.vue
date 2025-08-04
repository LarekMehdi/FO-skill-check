<script lang="ts">
import type { TakeQuestionInterface } from '../../interfaces/question.interface';
import type { PropType } from 'vue';
import InputTextArea from '../ui/InputTextArea.vue';
import AnswerQCM from './AnswerQCM.vue';

    export default {
        data(): {
            selectedAnswerIds: number[],
        } {
            return {
                selectedAnswerIds: [],
            }
        },
        props: {
            question: {
                type: Object as PropType<TakeQuestionInterface>,
                required: true,
            }
        },
        methods: {

        },
        components: {
            InputTextArea,
            AnswerQCM,
        }
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
            />
        </section>
        
        
    </article>
</template>