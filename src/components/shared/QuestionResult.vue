<script lang="ts">
import type { PropType } from 'vue';
import type { ResultQuestionInterface } from '../../interfaces/question.interface';
import InputText from '../ui/InputText.vue';
import InputTextArea from '../ui/InputTextArea.vue';
import InputCheck from '../ui/InputCheck.vue';
import type { AnswerInterface } from '../../interfaces/answer.interface';

    export default {
        data() {
            return {}
        },
        props: {
            question: {
                type: Object as PropType<ResultQuestionInterface>,
                required: true,
            }
        },
        methods: {
            isChecked(id: number) {
                return this.question.selectedAnswerIds.includes(id);
            },
            isAnswerCorrect(answer: AnswerInterface) {
                return answer.isCorrect && this.isChecked(answer.id);
            },
        },
        components: {
            InputTextArea,
            InputCheck,
        },
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

        <aside v-for="answer in question.choices" :key="answer.id" :class="`${isAnswerCorrect(answer) ? 'correct-answer' : 'wrong-answer'}`">
            <section class="row mb-3 align-items-center">
                <div class="col-10">
                    <InputText
                        v-model="answer.content"
                        :name="`answer-content-${answer.id}`"
                        placeholder="Réponse"
                        :displayLabel="false"
                        :disabled="true"
                        :inline="true"
                    />
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <InputCheck
                        :modelValue="isChecked(answer.id)"
                        :name="`answer-${answer.id}`"
                        label="Sélectionner"
                        :displayLabel="false"
                        :inline="true"
                        :isCircle="true"
                        :disabled="true"
                    />
                </div>
            </section>
        </aside>

    </article>
</template>

<style scoped>
    .correct-answer {
        background-color: green;
    }
    .wrong-answer {
        background-color: red;
    }
</style>