<script lang="ts">
import { Difficulty } from '../../../constants/difficulty.constante';
import type { CreateQuestionInterface } from '../../../interfaces/question.interface';

    export default {
        setup() {},
        data(): {data: CreateQuestionInterface}
         {
            return {
                data: {
                    content: '',
                    isMultipleAnswer: false,
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    answers: []
                }
            }
        },
        computed: {

        },
        methods: {
            // TODO: recup la liste des tags
        }
    }
</script>

<template>
    <main>
        <h1>Créer une question</h1>
    </main>
</template>