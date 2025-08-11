<script lang="ts">
import type { ResultTestSessionInterface } from '../../../interfaces/testSession.interface';
import { SessionService } from '../../../services/SessionService';
import QuestionResult from '../../shared/QuestionResult.vue';

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
        components: {
            QuestionResult,
        }

    }
</script>

<template>
    <h1>Resultat du test</h1>
    <h3>{{ item.testTitle }}</h3>


    <article>
        <section v-for="question in item.questionList">
            <QuestionResult
                :key="question.id"
                :question="question"
            />
        </section>
        
    </article>
</template>