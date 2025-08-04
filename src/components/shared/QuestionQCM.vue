<script lang="ts">
import type { TakeQuestionInterface } from '../../interfaces/question.interface';
import type { PropType } from 'vue';
import InputTextArea from '../ui/InputTextArea.vue';

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
            InputTextArea,
        }
    }
</script>

<template>
    <article>
        <InputTextArea
                v-model="question.content"
                name="content"
                placeholder="Question"
                :displayLabel="false"
                :cols="100"
                :disabled="true"
            />
    </article>
</template>