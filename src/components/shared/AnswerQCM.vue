<script lang="ts">
import type { PropType } from 'vue';
import type { AnswerInterface } from '../../interfaces/answer.interface';
import InputCheck from '../ui/InputCheck.vue';
import InputText from '../ui/InputText.vue';
import InputRadio from '../ui/InputRadio.vue';

    export default {
        data() {
            return {}
        },
        props: {
            modelValue: {
                type: [Array, Number] as PropType<number[] | number | null>,
                required: true,
            },
            answers: {
                type: Object as PropType<AnswerInterface[]>,
                required: true,
            },
            isMultipleAnswer: {
                type: Boolean,
                required: true,
            },
            questionId: {
                type: Number,
                required: false,
                default: -1,
            }
        },
        methods: {
            toggleAnswer(answerId: number, checked: boolean) {
                if (this.isMultipleAnswer) {
                    const current = Array.isArray(this.modelValue) ? this.modelValue : [];
                    const updated = checked ? [...current, answerId] : current.filter((id) => id !== answerId);
                    this.$emit('update:modelValue', updated);
                } else {
                    this.$emit("update:modelValue", checked ? answerId : null);
                }
                
            },
            isChecked(id: number) {
                return this.isMultipleAnswer ? Array.isArray(this.modelValue) && this.modelValue.includes(id) : this.modelValue === id;
            }
        },
        components: {
            InputCheck,
            InputText,
            InputRadio,
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
                    v-if="isMultipleAnswer"
                    :modelValue="isChecked(answer.id)"
                    :name="`answer-${answer.id}`"
                    label="Sélectionner"
                    :displayLabel="false"
                    :inline="true"
                    :isCircle="!isMultipleAnswer"
                    @update:model-value="(checked: boolean) => toggleAnswer(answer.id, checked)"
                />

                <InputRadio
                    v-else
                    :modelValue="typeof modelValue === 'number' ? modelValue : null"
                    :value="answer.id"
                    :name="`answer-${questionId}`"
                    label="Sélectionner"
                    :displayLabel="false"
                    :inline="true"
                    @update:model-value="$emit('update:modelValue', $event)"
                />
            </div>
        </section>
    </article>
</template>