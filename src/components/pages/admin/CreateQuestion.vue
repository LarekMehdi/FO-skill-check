<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty, getDifficultyOptions } from '../../../constants/difficulty.constante';
import type { CreateAnswerInterface, CreateQuestionInterface } from '../../../interfaces/question.interface';
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import InputText from '../../ui/InputText.vue';
import { withMessage } from '../../../utils/withMessage';
import ButtonSubmit from '../../ui/ButtonSubmit.vue';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputSelect from '../../ui/InputSelect.vue';
import InputSwitch from '../../ui/InputSwitch.vue';
import InputNumber from '../../ui/InputNumber.vue';

    export default {
        setup() {
            const toast = useToast();
            const difficultyOptions = getDifficultyOptions();
            return { 
                v$: useVuelidate(),
                toast,
                difficultyOptions,
            };
        },
        validations() {
            return {
                data: {
                    content: { required: withMessage('La question est requise', required) },
                    difficulty: { required: withMessage('La difficulté est requise', required) },
                    isMultipleAnswer: { required: withMessage('Ce champ est requis', required) },
                    timeLimit: { 
                        required: withMessage('La limite de temps est requise', required),
                        minValue: withMessage('La limite de temps doit être supérieur à 30s', minValue(30)),
                    },
                }
            }
        },
        data(): {data: CreateQuestionInterface, answerItems: CreateAnswerInterface[]}
         {
            return {
                data: {
                    content: '',
                    isMultipleAnswer: false,
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    answers: [],
                },
                answerItems: [],
            }
        },
        components: {
            InputText,
            ButtonSubmit,
            InputTextArea,
            InputSelect,
            InputSwitch,
            InputNumber,
        },
        computed: {

        },
        methods: {
            // TODO: recup la liste des tags

            createQuestion() {
                this.v$.$touch();
                if (this.v$.$invalid) return; 

                
                try {
                    this.data.answers = this.answerItems;
                    console.log(this.data);


                    this.toast.success("Question créée avec succés!");
                    this.resetForm();
                    
                } catch(e: unknown) {
                    console.error(e);
                    this.toast.error("Une erreur est survenue");
                }
                
            },
            resetForm() {
                this.data = {
                    content: '',
                    isMultipleAnswer: false,
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    answers: []
                };
            }
        }
    }
</script>

<template>
    <main>
        <h1>Créer une question</h1>
        <form @submit.prevent="createQuestion">

            <section class="row mb-3">
                <div class="col-md-12">
                    <InputTextArea
                        v-model="data.content"
                        name="question-content"
                        placeholder="Question"
                        :validation="v$.data.content"
                        :cols="70"
                        :rows="2"
                    />
                </div> 
            </section>

            <section class="row mb-3">
                <div class="col-md-6">
                    <InputSwitch
                        v-model="data.isMultipleAnswer"
                        name="isMultipleAnswer"
                        label="Plusieurs bonnes réponses?"
                        :inline="true"
                        :validation="v$.data.isMultipleAnswer"
                    />
                </div>
                <div class="col-md-6">
                    <InputSelect
                        v-model="data.difficulty"
                        name="difficulty"
                        :validation="v$.data.difficulty"
                        :options="difficultyOptions"
                    />
                </div>
            </section>

            <section class="row mb-3">
                <div class="col-md-12">
                    <InputNumber
                        v-model="data.timeLimit"
                        name="timeLimit"
                        label="Limite de temps (s)"
                        :inline="true"
                        :validation="v$.data.timeLimit"
                    />
                </div>
            </section>

            <ButtonSubmit content="Créer la question"/>
        </form>
    </main>
</template>