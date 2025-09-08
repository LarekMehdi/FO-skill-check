<script lang="ts">
import { useToast } from 'vue-toastification';
import { Difficulty, getDifficultyOptions } from '../../../constants/difficulty.constant';
import type { QuestionDetailsInterface, QuestionHasTagInterface } from '../../../interfaces/question.interface';
import { QuestionService } from '../../../services/QuestionService';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import CodeBlock from '../../ui/CodeBlock.vue';
import InputSwitch from '../../ui/InputSwitch.vue';
import InputNumber from '../../ui/InputNumber.vue';
import InputSelect from '../../ui/InputSelect.vue';
import TagBadge from '../../ui/TagBadge.vue';
import useVuelidate from '@vuelidate/core';
import type { TagInterface } from '../../../interfaces/tag.interface';
import { TagService } from '../../../services/TagService';
import type { OptionSelectInterface } from '../../../interfaces/input.interface';
import { UtilEntity } from '../../../utils/UtilEntity';
import Modal from '../../shared/Modal.vue';

    export default {
        setup() {
            const toast = useToast();
            const difficultyOptions = getDifficultyOptions();
            return {
                toast,
                difficultyOptions,
                v$: useVuelidate(),
            }
        },
        validations() {
            return {}
        },
        data(): { questionId: number, item: QuestionDetailsInterface, displayAddTagModal: boolean, newTagId: number|null, tagOptions: OptionSelectInterface[]}
        {
            return {
                questionId: Number(this.$route.params.id),
                item: {
                    id: -1,
                    isMultipleAnswer: false,
                    successRate: 0,
                    doneCount: 0,
                    correctCount: 0,
                    timeLimit: 0,
                    difficulty: Difficulty.EASY,
                    createdBy: {
                        id: -1,
                        pseudo: ''
                    },
                    answerList: [],
                    tagList: [],
                    testList: [],
                    content: ''
                },
                displayAddTagModal: false,
                newTagId: null,
                tagOptions: [],
            }
        },
        mounted() {
            this.initQuestionDetails();
        },
        methods: {
            async initQuestionDetails() {
                try {
                    this.item = await QuestionService.findDetails(this.questionId);
                    await this.initTagList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async initTagList() {
                try {
                    const tagList: TagInterface[] = await TagService.findAll();
                    this.tagOptions = UtilEntity.formatListForInputSelect<TagInterface>(tagList, 'label', 'id');
                    this.filterTagList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de la récupération des tags");
                }
            },
            async addTag() {
                if (!this.newTagId) {
                    this.toast.warning("Pas de tag sélectionné");
                    return;
                }
                try {
                    const questionTag: QuestionHasTagInterface = {
                        questionId: this.questionId,
                        tagId: this.newTagId
                    }
                    await QuestionService.addTagToQuestion(questionTag); 
                    this.toast.success("Tag ajouté avec succés");
                    this.closeAddTagModal();
                    this.initQuestionDetails();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de l'ajout du tag");
                }
            },
            async removeTag(tagId: number | undefined) {
                if (!tagId) {
                    this.toast.error("Une erreur est survenue");
                    return;
                }
                try {
                    const questionTag: QuestionHasTagInterface = {
                        questionId: this.questionId,
                        tagId: tagId
                    }
                    await QuestionService.removeTagFromQuestion(questionTag);
                    this.toast.success("Tag supprimé avec succés");
                    this.initQuestionDetails();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de la suppression du tag");
                }
            },
            filterTagList() {
                const existingIds: (number|undefined)[] = this.item.tagList.map((tag) => tag.id);
                this.tagOptions = this.tagOptions.filter(opt => {
                    const optId = Number(opt.value);
                    return !existingIds.includes(optId);
                });
            },
            openAddTagModal() {
                this.displayAddTagModal = true;
            },
            closeAddTagModal() {
                this.displayAddTagModal = false;
                this.newTagId = null;
            },
            goToTestDetails(testId: number) {
                this.$router.push(`/test/${testId}`);
            }
        },
        computed: {
            canAddTag() {
                return this.tagOptions.length > 0;
            },
        },
        components: {
            InputTextArea,
            InputText,
            CodeBlock,
            InputSwitch,
            InputNumber,
            InputSelect,
            TagBadge,
            Modal,
        }
    }
</script>

<template>
    <h1 class="mb-5">Détails de la question</h1>

    <article>

        <section class="row mb-3">
            <div class="col-md-6">
                <InputText
                    v-model="item.createdBy.pseudo"
                    name="createdByPseudo"
                    label="Créée par"
                    :disabled="true"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-4">
                <InputNumber
                    v-model="item.timeLimit"
                    name="timeLimit"
                    label="Limite de temps"
                    :symbol="'secondes'"
                    :disabled="true"
                />
            </div>
            <div class="col-md-4">
                <InputSelect
                    v-model="item.difficulty"
                    name="difficulty"
                    label="Difficulté"
                    :disabled="true"
                    :options="difficultyOptions"
                />
            </div>
            <div class="col-md-4 text-start">
                <InputSwitch
                    v-model="item.isMultipleAnswer"
                    name="isCorrect"
                    label="Plusieurs bonne réponses?"
                    :disabled="true"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-4">
                <InputNumber
                    v-model="item.doneCount"
                    name="doneCount"
                    label="Tentatives"
                    :disabled="true"
                />
            </div>
            <div class="col-md-4">
                <InputNumber
                    v-model="item.correctCount"
                    name="correctCount"
                    label="Réussites"
                    :disabled="true"
                />
            </div>
            <div class="col-md-4">
                <InputNumber
                    v-model="item.successRate"
                    name="successRate"
                    label="Taux de réussite"
                    :symbol="'%'"
                    :disabled="true"
                />
            </div>
        </section>
        
        <hr/>

        <section class="row mb-3">
            <div class="col-md-12">
                <InputTextArea
                    v-model="item.content"
                    name="question-content"
                    placeholder="Question"
                    :disabled="true"
                    :displayLabel="false"
                    :cols="70"
                    :rows="3"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-12">
                <CodeBlock
                    v-if="item.code"
                    :content="item.code"
                />
            </div>
        </section>

        <section v-for="answer in item.answerList" :key="answer.id" class="row mb-3">
            <div class="col-md-9">
                <InputTextArea
                    v-model="answer.content"
                    :name="`answer-${answer.id}`"
                    placeholder="Réponse"
                    :disabled="true"
                    :displayLabel="false"
                    :cols="70"
                    :rows="3"
                />
            </div>
            <div class="col-md-3 text-start">
                <InputSwitch
                    v-model="answer.isCorrect"
                    :name="`answer-${answer.id}-correct`"
                    label="Réponse correct?"
                    :displayLabel="true"
                    :disabled="true"
                />
            </div>
        </section>

        <hr/>

        <aside>
            <div class="col-md-12 text-start">
                <p>Cette question est présente dans {{ item.testList.length }} test{{ item.testList.length > 1 ? 's' : '' }}</p>
            </div>
            <section v-for="test in item.testList" :key="test.id" class="row mb-3">
                <div class="col-md-9">
                    <InputText
                        v-model="test.title"
                        :name="`test-${test.id}`"
                        label="Présent dans:"
                        :displayLabel="false"
                        :disabled="true"
                    />
                </div>
                <div class="col-md-3">
                    <i 
                        class="pi pi-external-link mt-2 text-primary"
                        style="font-size: 1rem"
                        @click="goToTestDetails(test.id)"
                        title="Détails du test"
                    >
                    </i>
                </div>
            </section>
        </aside>

        <hr/>

        <aside>
            <div class="d-flex flex-wrap gap-2">
                <TagBadge
                    v-for="tag in item.tagList"
                    :key="tag.id"
                    :content="tag.label"
                    :canDelete="true"
                    @delete="removeTag(tag.id)"
                />
                <i 
                    class="pi pi-plus-circle mt-1 text-success pointer"
                    style="font-size: 1.5rem"
                    title="Ajouter un tag"
                    @click="openAddTagModal"
                ></i>
            </div>
        </aside>
        
    </article>

    <!-- ************************* ADD TAG ************************* -->
    <Modal 
        :visible="displayAddTagModal" 
        @close="closeAddTagModal"
        @submit="addTag"
        title="Ajouter un tag"
        submitLabel="Ajouter"
    >
        <template #content>

            <InputSelect
                v-if="canAddTag"
                v-model="newTagId"
                name="newTag"
                :options="tagOptions"
            />
            <p v-else>Aucun tag à ajouter</p>
           
        </template>
    </Modal>
</template>

<style>
    .pointer {
        cursor: pointer;
    }
</style>