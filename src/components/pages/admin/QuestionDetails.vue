<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty, getDifficultyOptions } from '../../../constants/difficulty.constant';
import type { QuestionDetailsInterface } from '../../../interfaces/question.interface';
import { QuestionService } from '../../../services/QuestionService';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import CodeBlock from '../../ui/CodeBlock.vue';
import InputSwitch from '../../ui/InputSwitch.vue';
import InputNumber from '../../ui/InputNumber.vue';
import InputSelect from '../../ui/InputSelect.vue';

    export default {
        setup() {
            const toast = useToast();
            const difficultyOptions = getDifficultyOptions();
            return {
                toast,
                difficultyOptions,
            }
        },
        data(): { questionId: number, item: QuestionDetailsInterface}
        {
            return {
                questionId: Number(this.$route.params.id),
                item: {
                    id: -1,
                    isMultipleAnswer: false,
                    successRate: 0,
                    doneCount: 0,
                    correctCount: 0,
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    createdBy: {
                        id: -1,
                        pseudo: ''
                    },
                    tagList: [],
                    testList: [],
                    content: ''
                }
            }
        },
        mounted() {
            this.initQuestionDetails();
        },
        methods: {
            async initQuestionDetails() {
                try {
                    this.item = await QuestionService.findDetails(this.questionId);
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            }
        },
        components: {
            InputTextArea,
            InputText,
            CodeBlock,
            InputSwitch,
            InputNumber,
            InputSelect,
        }
    }
</script>

<template>
    <h1 class="mb-5">Détails de la question</h1>

    <article>

        <section class="row mb-3">
            <div class="col-md-6 text-start">
                <InputSwitch
                    v-model="item.isMultipleAnswer"
                    name="isCorrect"
                    label="Plusieurs bonne réponses?"
                    :disabled="true"
                />
            </div>
            <div class="col-md-6">
                <InputNumber
                    v-model="item.timeLimit"
                    name="timeLimit"
                    label="Limite de temps"
                    :symbol="'secondes'"
                    :disabled="true"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-4">
                <InputNumber
                    v-model="item.doneCount"
                    name="doneCount"
                    label="Tentatives"
                    :disabled="true"
                />
            </div>
            <div class="col-md-4">
                <InputNumber
                    v-model="item.correctCount"
                    name="correctCount"
                    label="Réussites"
                    :disabled="true"
                />
            </div>
            <div class="col-md-4">
                <InputNumber
                    v-model="item.successRate"
                    name="successRate"
                    label="Taux de réussite"
                    :symbol="'%'"
                    :disabled="true"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-6">
                <InputSelect
                    v-model="item.difficulty"
                    name="difficulty"
                    label="Difficulté"
                    :disabled="true"
                    :options="difficultyOptions"
                />
            </div>
            <div class="col-md-6">
                <InputText
                    v-model="item.createdBy.pseudo"
                    name="createdByPseudo"
                    label="Créée par"
                    :disabled="true"
                />
            </div>
        </section>
        

        <section class="row mb-3">
            <div class="col-md-12">
                <InputTextArea
                        v-model="item.content"
                        name="question-content"
                        placeholder="Question"
                        :disabled="true"
                        :displayLabel="false"
                        :cols="70"
                        :rows="3"
                    />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-12">
                <CodeBlock
                    v-if="item.code"
                    :content="item.code"
                />
            </div>
        </section>


    </article>
</template>