<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty } from '../../../constants/difficulty.constant';
import type { QuestionDetailsInterface } from '../../../interfaces/question.interface';
import { QuestionService } from '../../../services/QuestionService';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import CodeBlock from '../../ui/CodeBlock.vue';

    export default {
        setup() {
            const toast = useToast();
            return {
                toast,
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
        }
    }
</script>

<template>
    <h1 class="mb-5">Détails de la question</h1>

    <article>

        <section class="row mb-3">
            <div class="col-md-12">
                <InputTextArea
                        v-model="item.content"
                        name="question-content"
                        placeholder="Question"
                        :disabled="true"
                        :displayLabel="false"
                        :cols="70"
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