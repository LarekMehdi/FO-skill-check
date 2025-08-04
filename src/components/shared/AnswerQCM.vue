<script lang="ts">
import type { PropType } from 'vue';
import type { AnswerInterface } from '../../interfaces/answer.interface';
import InputCheck from '../ui/InputCheck.vue';
import InputText from '../ui/InputText.vue';

    export default {
        data() {
            return {}
        },
        props: {
            modelValue: {
                type: Array as PropType<Number[]>,
                required: true,
            },
            answers: {
                type: Object as PropType<AnswerInterface[]>,
                required: true,
            }
        },
        methods: {
            toggleAnswer(answerId: number, checked: boolean) {
                const updated = checked ? [...this.modelValue, answerId] : this.modelValue.filter((id) => id !== answerId);
                this.$emit('update:modelValue', updated);
            },
            isChecked(id: number) {
                return this.modelValue.includes(id);
            }
        },
        components: {
            InputCheck,
            InputText,
        },
        emits: ['update:modelValue']
    }
</script>

<template>
    <article v-for="answer in answers" :key="answer.id">
        <section class="row mb-3 align-items-center">
            <div class="col-10">
                <InputText
                    v-model="answer.content"
                    :name="`answer-content-${answer.id}`"
                    placeholder="Réponse"
                    :displayLabel="false"
                    :disabled="true"
                    :inline="true"
                />
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
                <InputCheck
                    :modelValue="isChecked(answer.id)"
                    :name="`answer-${answer.id}`"
                    label="Sélectionner"
                    :displayLabel="false"
                    :inline="true"
                    :isCircle="true"
                    @update:model-value="(checked: boolean) => toggleAnswer(answer.id, checked)"
                />
            </div>
        </section>
    </article>
</template>