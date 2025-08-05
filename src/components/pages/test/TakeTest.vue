<script lang="ts">
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { SubmitTestInterface, TakeTestInterface } from '../../../interfaces/test.interface';
import { TestService } from '../../../services/TestService';
import QuestionQCM from '../../shared/QuestionQCM.vue';
import type { SubmitQuestionInterface } from '../../../interfaces/question.interface';
import ButtonCustom from '../../ui/ButtonCustom.vue';

    export default {
        data(): {
            item: TakeTestInterface,
            testId: number,
            submitData: SubmitTestInterface,
            currentQuestionIndex: number,
        } {
            return {
                testId: Number(this.$route.params.id),
                item: {
                    id: Number(this.$route.params.id),
                    title: '',
                    questionList: []
                },
                submitData: {
                    id: Number(this.$route.params.id),
                    answers: []
                },
                currentQuestionIndex: 0,
            }
        },
        setup() {
            const { isLoggedIn, userId } = useAuth();
            const toast = useToast();
            return {
                isLoggedIn,
                userId,
                toast,
            }
        },
        mounted() {
            this.initTakeTest();
        },
        computed: {
            isLastPage() {
                return this.item.questionList.length - 1 === this.currentQuestionIndex;
            },
        },
        methods: {
            async initTakeTest() {
                this.item = await TestService.findTestToTake(this.testId);
            },
            async submitTest() {
                console.log('result => ', this.submitData);
                try {
                    await TestService.submitTestResult(this.submitData);
                    this.$router.push(`test/${this.testId}/result/${this.userId}`);
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            onAnswerUpdate(updatedQuestion: SubmitQuestionInterface) {
                this.submitData.answers = [
                    ...this.submitData.answers.filter((a) => a.questionId !== updatedQuestion.questionId),
                    updatedQuestion
                ];
            },
            goToNextQuestion() {
                this.currentQuestionIndex++;
            },
        },
        components: {
            QuestionQCM,
            ButtonCustom,
        }
    }
</script>

<template>
    <h1>{{ item.title }}</h1>

    <section v-if="item.questionList.length > 0">
        <QuestionQCM
            :key="currentQuestionIndex"
            :question="item.questionList[currentQuestionIndex]"
            @update:model-value="onAnswerUpdate"
        />
        <div class="mt-4 d-flex justify-content-end">
            <ButtonCustom 
                v-if="!isLastPage"
                content="Valider" 
                buttonClass="btn-primary btn-lg"
                :style="{width: '150px'}"
                @click="goToNextQuestion"
            />
            <ButtonCustom 
                v-else
                content="Envoyer" 
                buttonClass="btn-success btn-lg"
                :style="{width: '150px'}"
                @click="submitTest"
            />
        </div>
        
    </section>

</template>