<script lang="ts">
import { useToast } from 'vue-toastification';
import { TestService } from '../../../services/TestService';
import type { TestDetailsInterface, TestWithQuestionIds } from '../../../interfaces/test.interface';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import InputNumber from '../../ui/InputNumber.vue';
import { useAuth } from '../../../composables/useAuth';
import Modal from '../../shared/Modal.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import type { QuestionInterface } from '../../../interfaces/question.interface';
import type { GenericFilter } from '../../../interfaces/filter.interface';
import { QuestionService } from '../../../services/QuestionService';
import { Column, DataTable, type DataTablePageEvent } from 'primevue';
import { Difficulty, getDifficultyLabel } from '../../../constants/difficulty.constant';
import type { TagInterface } from '../../../interfaces/tag.interface';
import InputCheck from '../../ui/InputCheck.vue';
import CodeBlock from '../../ui/CodeBlock.vue';
import { UtilEntity } from '../../../utils/UtilEntity';
import Title from '../../shared/Title.vue';
import TagBadge from '../../ui/TagBadge.vue';

    export default {
        setup() {
            const toast = useToast();
            const { isAdmin, isLoggedIn } = useAuth();
            return {
                toast,
                isAdmin,
                isLoggedIn,
            }
        },
        mounted() {
            this.testId = Number(this.$route.params.id);
            this.initDetails();
        },
        data(): {
            testId: number,
            item: TestDetailsInterface,
            displayAddQuestionModal: boolean,
            displayAddTagModal: boolean,
            questionIds: number[],
            questionList: QuestionInterface[],
            questionFilter: GenericFilter,
            questionTotalElement: number,
            isUpdating: boolean,
        }
        {
            return {
                testId: -1,
                item: {
                    id: 0,
                    successRate: 0,
                    timeLimit: 0,
                    title: '',
                    description: '',
                    questionList: [],
                    tagList: [],
                },
                displayAddQuestionModal: false,
                displayAddTagModal: false,
                questionIds: [],
                questionList: [],
                questionFilter: {limit: 10, offset: 0},
                questionTotalElement: 0,
                isUpdating: false,
            }
        },
        methods: {
            async initDetails() {
                try {
                    this.item = await TestService.findById(this.testId);
                    this.initQuestionIds();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async getAllQuestions() {
                try {
                    const result = await QuestionService.findAll(this.questionFilter);
                    this.questionList = result.datas;
                    this.questionTotalElement = result.totalElement;

                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async updateTest() {

            },
            initQuestionIds() {
                this.questionIds = this.item.questionList ? this.item.questionList.map((q) => q.id) : [];
            },
            openAddQuestionModal() {
                this.displayAddQuestionModal = true;
                this.getAllQuestions();
            },
            closeAddQuestionModal() {
                this.displayAddQuestionModal = false;
                this.initQuestionIds();
            },
            openAddTagModal() {

            },
            closeAddTagModal() {

            },
            openDeleteModal() {

            },
            async addQuestions() {
                try {

                    const testData: TestWithQuestionIds = {
                        testId: this.testId,
                        questionIds: this.questionIds,
                    }

                    await TestService.updateQuestions(testData);
                    this.toast.success("Questions mises à jour avec succés");
                    this.initDetails();
                    this.closeAddQuestionModal();

                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            displayLabelDifficulty(value: Difficulty) {
                return getDifficultyLabel(value);
            },
            updateQuestionIds(questionId: number, checked: boolean) {
                if (checked) {
                    if (!this.questionIds.includes(questionId)) {
                        this.questionIds.push(questionId);
                    }
                } else {
                    this.questionIds = this.questionIds.filter((id) => id !== questionId);
                }
            },
            goToTakeTest() {
                this.$router.push(`/test/${this.testId}/takeTest`);
            },
            onPage(event: DataTablePageEvent) {
                this.questionFilter = UtilEntity.updateFilterOnPage(event, this.questionFilter);
                this.getAllQuestions();
            },
            removeTag(tagId: number|undefined) {
                if (!tagId) {
                    this.toast.error("Aucun tag à supprimer");
                }


            },
            startUpdating() {
                this.isUpdating = true;
            },
            stopUpdating() {
                this.isUpdating = false;
            },
        },
        computed: {
            getQuestionCount(): number {
                return this.item?.questionList.length ?? 0;
            },
            getTimeLimitSymbol(): string {
                const tl: number = this.item.timeLimit;
                if (tl > 60 ) {
                    return tl/60 > 2 ? 'minutes' : 'minute';
                }
                return tl > 0 ? 'secondes' : 'seconde';
            },
            computeTimeLimit(): number {
                const tl: number = this.item?.timeLimit;
                if (tl >= 60) return Math.floor(tl/60);
                return tl;
            },
            displaySuccessRate() {
                return Number((this.item.successRate * 100).toFixed(1));
            },
            canDoTest() {
                return this.item.questionList.length > 0;
            }
        },
        components: {
            InputTextArea,
            InputText,
            InputNumber,
            Modal,
            ButtonCustom,
            DataTable,
            Column,
            InputCheck,
            CodeBlock,
            Title,
            TagBadge,
        },
    }
</script>

<template>

    <Title :canGoBack="true" :content="item.title"></Title>

    <div class="col-md-6 d-flex justify-content-end"> </div>

    <section class="row mb-3">
        <aside class="col d-flex justify-content-between align-items-center">
            <div>
                <ButtonCustom 
                    v-if="isAdmin"
                    content="Ajouter des questions"
                    @click="openAddQuestionModal"
                />
            </div>

            <div class="d-flex align-items-center">
                <ButtonCustom 
                    v-if="isLoggedIn && canDoTest"
                    buttonClass="ms-3 btn-success"
                    content="Passer le test"
                    @click="goToTakeTest"
                />
                <i 
                    v-if="!isUpdating"
                    class="pi pi-pen-to-square pointer  text-primary" 
                    style="font-size: 1.5rem"
                    @click="startUpdating"
                ></i>
                <i 
                    v-if="!isUpdating"
                    class="pi pi-trash pointer  ms-3" 
                    style="color: red; font-size: 1.5rem;" 
                    
                    @click="openDeleteModal()"
                    title="Supprimer cette question"
                ></i>
                <ButtonCustom 
                        v-if="isUpdating"
                        content="Annuler" 
                        buttonClass="btn-danger "
                        @click="stopUpdating"
                />
                <ButtonCustom 
                    v-if="isUpdating"
                    content="Sauvegarder" 
                    buttonClass="btn-primary  ms-3"
                    @click="updateTest"
                />
            </div>
            
            
        </aside>
    </section>

    <article>
        <section class="row mb-3">
            <div class="col-md-12">
                <InputTextArea
                    v-model="item.description"
                    name="description"
                    placeholder="Description"
                    :displayLabel="false"
                    :cols="70"
                    :rows="2"
                    :disabled="true"
                />
            </div>
        </section>
        
        <section class="row mb-3">
            <div class="col-md-6">
                <InputNumber
                    v-model="displaySuccessRate"
                    name="successRate"
                    placeholder="Taux de réussite moyen"
                    label="Taux de réussite moyen"
                    :displayLabel="true"
                    :disabled="true"
                    :symbol="'%'"
                />
            </div>
            <div class="col-md-6">
                <InputNumber
                    v-model="computeTimeLimit"
                    name="timeLimit"
                    placeholder="Durée max."
                    label="Durée max."
                    :displayLabel="true"
                    :disabled="true"
                    :symbol="getTimeLimitSymbol"
                />
            </div>
        </section>

        <section class="row mb-3">
            <div class="col-md-12">
                <InputNumber
                    v-model="getQuestionCount"
                    name="questionCount"
                    placeholder="Nombre de questions."
                    label="Nombre de questions"
                    :displayLabel="true"
                    :disabled="true"
                />
            </div>
        </section>
    </article>

    <hr/>
    
    <aside>
        <div class="d-flex flex-wrap gap-2">
            <TagBadge
                v-if="item.tagList && item.tagList.length > 0"
                v-for="tag in item.tagList"
                :key="tag.id"
                :content="tag.label"
                :canDelete="true"
                @delete="removeTag(tag.id)"
            />
            <small v-else>Ce test n'a pas encore de tag</small>
            <i 
                v-if="isUpdating"
                class="pi pi-plus-circle mt-1 text-success pointer"
                style="font-size: 1.5rem"
                title="Ajouter un tag"
                @click="openAddTagModal"
            ></i>
        </div>
    </aside>

    <article v-if="isAdmin">
        <DataTable :value="item.questionList">
                <template #empty>Aucunes questions à afficher</template>
                <Column header="Question" field="content" sortable style="width: 40%;">
                    <template #body="slotProps">
                        {{  slotProps.data.content }}
                    </template>
                </Column>
                <Column field="code" style="width: 50%;">
                    <template #body="slotProps">
                        <CodeBlock
                            v-if="slotProps.data.code"
                            :content="slotProps.data.code"
                        />
                    </template>
                </Column>
                <Column header="Difficulté" field="difficulty" style="width: 10%;">
                    <template #body="slotProps">
                        {{  displayLabelDifficulty(slotProps.data.difficulty) }}
                    </template>
                </Column>
            </DataTable>
    </article>

    <!-- TODO: a mettre dans un composant -->
    <Modal 
        :visible="displayAddQuestionModal" 
        :isLarge="true"
        @close="closeAddQuestionModal"
        @submit="addQuestions"
        title="Ajouter des questions"
        submitLabel="Ajouter"
    >
        <template #content>

            <DataTable 
                :value="questionList"
                tableStyle="min-width: 50rem" 
                :lazy="true"
                :paginator="true"
                :rows="10"
                :totalRecords="questionTotalElement"
                @page="onPage"
            >
                <template #empty>Aucunes questions à ajouter</template>
                <Column style="width: 10%;">
                    <template #body="slotProps">
                        <InputCheck
                            :modelValue="questionIds.includes(slotProps.data.id)"
                            :name="`question-${slotProps.data.id}`"
                            label="Sélectionner"
                            :displayLabel="false"
                            :inline="true"
                            @update:modelValue="(checked: boolean) => updateQuestionIds(slotProps.data.id, checked)"
                        />
                    </template>
                </Column>
                <Column header="Question" field="content" sortable style="width: 60%;">
                    <template #body="slotProps">
                        {{  slotProps.data.content }}
                    </template>
                </Column>
                <Column field="code" style="width: 50%;">
                    <template #body="slotProps">
                        <CodeBlock
                            v-if="slotProps.data.code"
                            :content="slotProps.data.code"
                        />
                    </template>
                </Column>
                <Column header="Tag" field="tags" sortable style="width: 20%;">
                    <template #body="slotProps">
                        {{ (slotProps.data.tagList as TagInterface[]).map(tag => tag.label).join(', ') }}
                    </template>
                </Column>
                <Column header="Difficulté" field="difficulty" sortable style="width: 10%;">
                    <template #body="slotProps">
                        {{  displayLabelDifficulty(slotProps.data.difficulty) }}
                    </template>
                </Column>
            </DataTable>

        </template>
        
    </Modal>
    
</template>