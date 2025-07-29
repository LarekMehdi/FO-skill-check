<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty } from '../../../constants/difficulty.constante';
import type { CreateAnswerInterface, CreateQuestionInterface } from '../../../interfaces/question.interface';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import InputText from '../../ui/InputText.vue';
import { withMessage } from '../../../utils/withMessage';
import ButtonSubmit from '../../ui/ButtonSubmit.vue';
import InputTextArea from '../../ui/InputTextArea.vue';

    export default {
        setup() {
            const toast = useToast();
            return { 
                v$: useVuelidate(),
                toast,
            };
        },
        validations() {
            return {
                data: {
                    content: { required: withMessage('La question est requise', required) },
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
            InputTextArea
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

            <section class="mb-3">
                <InputTextArea
                    v-model="data.content"
                    name="question-content"
                    placeholder="Question"
                    :displayLabel="false"
                    :validation="v$.data.content"
                    :cols="70"
                    :rows="2"
                />
            </section>

            <ButtonSubmit content="Créer la question"/>
        </form>
    </main>
</template>