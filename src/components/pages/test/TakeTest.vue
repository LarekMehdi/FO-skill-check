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
        } {
            return {
                testId: -1,
                item: {
                    id: -1,
                    title: '',
                    questionList: []
                },
                submitData: {
                    id: -1,
                    answers: []
                }
            }
        },
        setup() {
            const { isLoggedIn } = useAuth();
            const toast = useToast();
            return {
                isLoggedIn,
                toast,
            }
        },
        mounted() {
            this.testId = Number(this.$route.params.id);
            this.initTakeTest();
        },
        methods: {
            async initTakeTest() {
                this.item = await TestService.findTestToTake(this.testId);
                console.log(this.item);
            },
            onAnswerUpdate(updatedQuestion: SubmitQuestionInterface) {
                this.submitData.answers = [
                    ...this.submitData.answers.filter((a) => a.questionId !== updatedQuestion.questionId),
                    updatedQuestion
                ];
            },
            goToNextQuestion() {

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
            :question="item.questionList[0]"
            @update:model-value="onAnswerUpdate"
        />
        <div class="mt-4 d-flex justify-content-end">
            <ButtonCustom 
                content="Valider" 
                buttonClass="btn-primary btn-lg"
                :style="{width: '150px'}"
                @click="goToNextQuestion"
            />
        </div>
        
    </section>

</template>