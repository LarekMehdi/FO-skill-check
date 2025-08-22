<script lang="ts">
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { SubmitTestInterface, TakeTestInterface, TestSessionInterface } from '../../../interfaces/test.interface';
import { TestService } from '../../../services/TestService';
import QuestionQCM from '../../shared/QuestionQCM.vue';
import type { SubmitQuestionInterface } from '../../../interfaces/question.interface';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import Timer from '../../ui/Timer.vue';

    export default {
        data(): {
            item: TakeTestInterface,
            testId: number,
            submitData: SubmitTestInterface,
            currentQuestionIndex: number,
            questionCount: number | null,
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
                questionCount: null,
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
            currentQuestion() {
                if (this.item.questionList.length > 0) {
                    return this.item.questionList[this.currentQuestionIndex];
                }
            },
        },
        methods: {
            async initTakeTest() {
                this.item = await TestService.findTestToTake(this.testId);
                this.questionCount = this.item.questionList.length;
            },
            async submitTest() {
                try {
                    const testSession: TestSessionInterface = await TestService.submitTestResult(this.submitData);
                    this.$router.push(`/test/${this.testId}/result/${testSession.id}`);
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
            Timer,
        }
    }
</script>

<template>
    <aside class="d-flex align-items-center mb-4">
        <div class="flex-grow-1">
            <h1 class="text-center m-0"> {{ item.title }}</h1>
        </div>
        <Timer
            v-if="currentQuestion"
            :question="currentQuestion"
            :key="currentQuestionIndex"
            @timeOut="goToNextQuestion"
        />
    </aside>
    
    <section class="mb-3">
         <p class="text-start">Question {{ currentQuestionIndex + 1 }} / {{ questionCount }}</p>
    </section>

    <section v-if="currentQuestion">
        <QuestionQCM
            :key="currentQuestionIndex"
            :question="currentQuestion"
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