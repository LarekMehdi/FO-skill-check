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
import { Column, DataTable } from 'primevue';
import { Difficulty, getDifficultyLabel } from '../../../constants/difficulty.constant';
import type { TagInterface } from '../../../interfaces/tag.interface';
import InputCheck from '../../ui/InputCheck.vue';

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
            questionIds: number[],
            questionList: QuestionInterface[],
            questionFilter: GenericFilter,
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
                    questionList: []
                },
                displayAddQuestionModal: false,
                questionIds: [],
                questionList: [],
                questionFilter: {limit: 10, offset: 0}
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
                    this.questionList = await QuestionService.findAll(this.questionFilter);
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
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
        },
    }
</script>

<template>
    <h1>{{ item.title }}</h1>
    <section class="row mb-3">
        <aside class="col text-end">
            <ButtonCustom 
                v-if="isAdmin"
                content="Ajouter des questions"
                @click="openAddQuestionModal"
            />
            <ButtonCustom 
                v-if="isLoggedIn"
                buttonClass="ms-3 btn-success"
                content="Passer le test"
                @click="goToTakeTest"
            />
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
                    placeholder="Taux de réussite"
                    label="Taux de réussite"
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

    <article v-if="isAdmin">
        <DataTable :value="item.questionList">
                <template #empty>Aucunes questions à afficher</template>
                <Column header="Question" field="content" sortable style="width: 60%;">
                    <template #body="slotProps">
                        {{  slotProps.data.content }}
                    </template>
                </Column>
                <Column header="Difficulté" field="difficulty" sortable style="width: 10%;">
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

            <DataTable :value="questionList">
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