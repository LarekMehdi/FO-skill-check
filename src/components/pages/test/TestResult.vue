<script lang="ts">
import type { ResultTestSessionInterface } from '../../../interfaces/testSession.interface';
import { SessionService } from '../../../services/SessionService';
import QuestionResult from '../../shared/QuestionResult.vue';
import Title from '../../shared/Title.vue';

    export default {
        mounted() {
            this.initTestResult();
        },
        data(): {sessionId: number, item: ResultTestSessionInterface}
        {
            return {
                sessionId: Number(this.$route.params.sessionId),
                item: {
                    sessionId: Number(this.$route.params.sessionId),
                    testId: 0,
                    userId: 0,
                    testTitle: '',
                    questionList: [],
                    createdAt: new Date(),
                }
            }
        },
        methods: {
            async initTestResult() {
                this.item = await SessionService.findTestSession(this.sessionId);
            },
        },
        computed: {
            correctQuestionCount() {
                return this.item.questionList.filter((q) => q.isCorrect === true).length;
            },
            questionCount() {
                return this.item.questionList.length;
            },
        },
        components: {
            QuestionResult,
            Title,
        }

    }
</script>

<template>

    <Title content="Résultat du test"></Title>
    <h3>{{ item.testTitle }}</h3>

    <aside>
        <p>Nombre de bonnes réponses: {{ correctQuestionCount }} / {{ questionCount }}</p>
    </aside>


    <article>
        <section v-for="question in item.questionList">
            <QuestionResult
                :key="question.id"
                :question="question"
            />
        </section>
        
    </article>
</template>