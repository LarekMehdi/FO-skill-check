<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty, getDifficultyOptions } from '../../../constants/difficulty.constant';
import type { CreateAnswerInterface, CreateQuestionInterface } from '../../../interfaces/question.interface';
import useVuelidate from '@vuelidate/core';
import { helpers, minValue, required } from '@vuelidate/validators';
import InputText from '../../ui/InputText.vue';
import { withMessage } from '../../../utils/withMessage';
import ButtonSubmit from '../../ui/ButtonSubmit.vue';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputSelect from '../../ui/InputSelect.vue';
import InputSwitch from '../../ui/InputSwitch.vue';
import InputNumber from '../../ui/InputNumber.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import { QuestionService } from '../../../services/QuestionService';
import type { TagInterface } from '../../../interfaces/tag.interface';
import { TagService } from '../../../services/TagService';
import { UtilEntity } from '../../../utils/UtilEntity';
import type { OptionSelectInterface } from '../../../interfaces/input.interface';
import InputCode from '../../ui/inputCode.vue';



    export default {
        mounted() {
            this.initTagList();
        },
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
                    timeLimit: { 
                        required: withMessage('La limite de temps est requise', required),
                        minValue: withMessage('La limite de temps doit être supérieur à 30s', minValue(30)),
                    },
                },
                answerItems: {
                    $each: helpers.forEach( {
                        content: { required: withMessage('La réponse est requise', required) },
                    })
                }
            }
        },
        data(): {
                data: CreateQuestionInterface,
                answerItems: CreateAnswerInterface[],
                tagId: number|null,
                tagList: OptionSelectInterface[],
            }
         {
            return {
                data: {
                    content: '',
                    code: '',
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    answers: [],
                    tagIds: [],
                },
                answerItems: [
                    {
                        content: '',
                        isCorrect: false,
                    }
                ],
                tagId: null,
                tagList: [],
            }
        },
        components: {
            InputText,
            ButtonSubmit,
            InputTextArea,
            InputSelect,
            InputSwitch,
            InputNumber,
            ButtonCustom,
            InputCode,
        },
        computed: {

        },
        methods: {
            async initTagList() {
                try {
                    const tagList = await TagService.findAll();
                    this.tagList = UtilEntity.formatListForInputSelect<TagInterface>(tagList, 'label', 'id');

                } catch(e: unknown) {
                    this.toast.error("Impossible de récupérer la liste des tags");
                }
            },
            async createQuestion() {
                const valid = await this.v$.$validate();

                if (!valid) {
                    //console.log(this.v$.data.content.$errors);
                    this.toast.error("Il y a des erreurs dans le formulaire");
                    return;
                }

                if (this.answerItems.length < 2) {
                    this.toast.error("Il faut au moins 2 réponses");
                    return;
                }

                let atLeastOneCorect: boolean = false;
                for (const item of this.answerItems) {
                    if (item.isCorrect) {
                        atLeastOneCorect = true;
                        break;
                    } 
                }
                if (!atLeastOneCorect) {
                    this.toast.error("Au moins une réponse doit être correct");
                    return;
                } 
                
                try {
                    //TODO: ajouter plusiers tags en meme temps (multiselect)
                    this.data.answers = this.answerItems;
                    this.tagId ? this.data.tagIds = [this.tagId] : null;

                    await QuestionService.create(this.data);

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
                    code: '',
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    answers: [],
                    tagIds: [],
                };
                this.v$.$reset();
                this.answerItems = [];
                this.addAnswerItem();
            },
            addAnswerItem() {
                let item: CreateAnswerInterface = {
                    content: '',
                    isCorrect: false,
                }
                this.answerItems.push(item);
            },
            removeAnswerItem(index: number) {
                this.answerItems.splice(index, 1);
            },
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
                        :displayLabel="false"
                        :validation="v$.data.content"
                        :cols="70"
                        :rows="2"
                        :isRequired="true"
                    />
                </div> 
            </section>

            <section class="row mb-3">
                <div class="col-md-12">
                    
                    <InputCode
                        v-model="data.code"
                    />
                </div> 
            </section>

            <section class="row mb-3">
                <div class="col-md-3">
                    <InputSelect
                        v-model="data.difficulty"
                        name="difficulty"
                        :validation="v$.data.difficulty"
                        :options="difficultyOptions"
                    />
                </div>
                <div class="col-md-9">
                    <InputNumber
                        v-model="data.timeLimit"
                        name="timeLimit"
                        label="Limite de temps"
                        :inline="true"
                        :validation="v$.data.timeLimit"
                        :isRequired="true"
                        :symbol="'secondes'"
                    />
                </div>
            </section>

            <section class="row mb-3">
                <div class="col-md-12">
                    <InputSelect 
                        v-model="tagId"
                        name="difficulty"
                        label="Ajouter un tag?"
                        :options="tagList"
                        :inline="true"
                    />
                </div>
            </section>

            <hr v-if="answerItems.length > 0"/>

            <!-- ***************** ANSWERS ***************** -->

            <!-- TODO: message d'erreur pour la validation de answerItems -->
            <aside v-for="(item, index) in answerItems" :key="index">
                <section class="row mb-3">
                    <div class="col-md-12">
                        <InputTextArea
                            v-model="item.content"
                            :name="`answer-${index}-content`"
                            :label="`Réponse ${index + 1}`"
                            :displayLabel="false"
                            :placeholder="`Réponse ${index + 1}`"
                            :validation="v$.answerItems.$each[index]?.content"
                            :cols="70"
                            :rows="2"
                        />
                    </div>
                </section>

                <section class="row mb-3">
                    <div class="col-md-10">
                        <InputSwitch
                            v-model="item.isCorrect"
                            name="isCorrect"
                            label="Réponse correct?"
                            :inline="true"
                            :validation="v$.answerItems.$each[index]?.isCorrect"
                        />
                    </div>
                     <div class="col-md-2">
                        <i 
                            class="pi pi-trash" 
                            style="color: red" 
                            @click="removeAnswerItem(index)"
                            title="Supprimer cette réponse"
                        >
                        </i>
                     </div>
                </section>

                
            </aside>

            <aside class="row mb-3">
                <section class="col text-start">
                    <ButtonCustom
                        content="Ajouter une réponse"
                        @click="addAnswerItem"
                    />
                </section>
                <section class="col text-end">
                    <ButtonSubmit content="Sauvegarder"/>
                </section>
            </aside>

        </form>
    </main>
</template>