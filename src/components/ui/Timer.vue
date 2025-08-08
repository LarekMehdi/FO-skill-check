<script lang="ts">
import type { PropType } from 'vue';
import type { TakeQuestionInterface } from '../../interfaces/question.interface';

    export default {
        props: {
            question: {
                type: Object as PropType<TakeQuestionInterface>,
                required: true,
            }
        },
        methods: {

        },
        components: {

        },
    }
</script>

<template>
    timer
</template>