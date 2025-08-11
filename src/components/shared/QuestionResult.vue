<script lang="ts">
import type { PropType } from 'vue';
import type { ResultQuestionInterface } from '../../interfaces/question.interface';
import InputText from '../ui/InputText.vue';
import InputTextArea from '../ui/InputTextArea.vue';
import InputCheck from '../ui/InputCheck.vue';
import type { ResultAnswerInterface } from '../../interfaces/answer.interface';
import CodeBlock from '../ui/CodeBlock.vue';

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
            isAnswerCorrect(answer: ResultAnswerInterface) {
                return answer.isSelectedByUser && answer.isCorrect;
            },
            isAnswerIncorrect(answer: ResultAnswerInterface) {
                return answer.isSelectedByUser && !answer.isCorrect;
            },
            getBorderClass(answer: ResultAnswerInterface) {
                if (this.isAnswerIncorrect(answer)) return 'border border-3 border-danger';
                if (answer.isCorrect) return 'border border-3 border-success';
                return '';
            }
        },
        components: {
            InputTextArea,
            InputText,
            InputCheck,
            CodeBlock,
        },
    }
</script>

<template>
    <article class="my-5">
        <section class="mb-3">
            <!-- <InputTextArea
                v-model="question.content"
                name="content"
                placeholder="Question"
                :displayLabel="false"
                :cols="100"
                :disabled="true"
                inputClass="bg-light rounded"
            /> -->
            <!-- <pre class="bg-dark text-light p-3 rounded overflow-auto">
                <code>{{ question.content }}</code>
            </pre> -->


            <!-- TODO: séparer la question et le code -->
            <!-- TODO: ajouter un type language sur les tags -->
            <CodeBlock :content="question.content" language="java" />
        </section>

        <section v-for="answer in question.choices" :key="answer.id">
            <article class="row mb-3 align-items-center">
                <section class="col-12">
                    <div :class="`d-flex align-items-center justify-content-between p-1 rounded ${getBorderClass(answer)}`">
                        <div class="flex-grow-1 me-3">
                            <InputText
                                v-model="answer.content"
                                :name="`answer-content-${answer.id}`"
                                placeholder="Réponse"
                                :displayLabel="false"
                                :disabled="true"
                                :inline="true"
                            />
                        </div>
                        <div class="flex-shrink-0">
                            <InputCheck
                                :modelValue="answer.isSelectedByUser"
                                :name="`answer-${answer.id}`"
                                label="Sélectionner"
                                :displayLabel="false"
                                :inline="true"
                                :isCircle="true"
                                :disabled="true"
                            />
                        </div>
                    </div>
                </section>
            </article>
        </section>
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