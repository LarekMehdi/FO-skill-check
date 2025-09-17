<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { QuestionListInterface } from '../../../interfaces/question.interface';
import type { PageInterface, QuestionListFilterInterface } from '../../../interfaces/filter.interface';
import { QuestionService } from '../../../services/QuestionService';
import { UtilEntity } from '../../../utils/UtilEntity';
import CodeBlock from '../../ui/CodeBlock.vue';
import { getDifficultyLabel, getDifficultyOptions, type Difficulty } from '../../../constants/difficulty.constant';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import TagBadge from '../../ui/TagBadge.vue';
import ModalCancel from '../../shared/ModalCancel.vue';
import InputCheck from '../../ui/InputCheck.vue';
import { SortOrder } from '../../../constants/filter.constant';
import FilterPanel from '../../shared/FilterPanel.vue';
import InputSelect from '../../ui/InputSelect.vue';
import Title from '../../shared/Title.vue';


    export default {
        setup() {
            const toast = useToast();
            const { isAdmin } = useAuth(); 
            const difficultyOptions = getDifficultyOptions();
            return {
                toast,
                isAdmin,
                difficultyOptions,
            }
        },
        mounted() {
            if (this.$route.hash === '#deleted') {
                this.toast.success("Question supprimée avec succès");
                this.$router.replace({ hash: '' });
            }
            this.initQuestionList();
        },
        data(): {
            item: PageInterface<QuestionListInterface>, 
            questionList: QuestionListInterface[], 
            filter: QuestionListFilterInterface, 
            displayDeleteModal: boolean,
            displayDeleteAllModal: boolean,
            displayFilterPanel: boolean,
            questionIdToDelete: number | null,
            selectedQuestions: QuestionListInterface[],
            allSelectedQuestions: QuestionListInterface[],
        } {
            return {
                item: {
                    datas: [],
                    totalElement: 0
                },
                questionList: [],
                filter: {
                    limit: 10,
                    offset: 0,
                    sortBy: 'id',
                    sortOrder: SortOrder.ASC,
                    difficulty: null,
                },
                displayDeleteModal: false,
                displayDeleteAllModal: false,
                displayFilterPanel: false,
                questionIdToDelete: null,
                selectedQuestions: [],
                allSelectedQuestions: [],
            }
        },
        methods: {
            async initQuestionList() {
                if (this.displayFilterPanel) this.closeFilterPanel();

                this.item = await QuestionService.findAll(this.filter);
                this.questionList = this.item.datas;
                this.selectedQuestions = this.questionList.filter(q =>
                    this.allSelectedQuestions.some(sq => sq.id === q.id)
                );
            },
            async deleteQuestion() {
                if (!this.questionIdToDelete) {
                    this.toast.error("Pas de question à supprimer");
                    return;
                }

                try {
                    await QuestionService.delete(this.questionIdToDelete);

                    this.toast.success("Question supprimée avec succés");
                    this.closeDeleteModal();
                    this.initQuestionList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async deleteAllQuestions() {
                if (this.allSelectedQuestions.length <= 0) {
                    this.toast.error("Pas de question à supprimer");
                    return;
                }

                try {
                    const ids: number[] = this.allSelectedQuestions.map((q) => q.id);
                    await QuestionService.deleteAll(ids);

                    this.toast.success("Questions supprimées avec succés");
                    this.closeDeleteAllModal();
                    this.selectedQuestions = [];
                    this.allSelectedQuestions = [];
                    this.initQuestionList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            openDeleteModal(questionId: number) {
                this.questionIdToDelete = questionId;
                this.displayDeleteModal = true;
            },
            closeDeleteModal() {
                this.questionIdToDelete = null;
                this.displayDeleteModal = false;
            },
            displayLabelDifficulty(value: Difficulty) {
                return getDifficultyLabel(value);
            },
            displaySuccessRate(value: number) {
                return UtilEntity.displaySuccessRate(value);
            },
            onRowClick(event: DataTableRowClickEvent<QuestionListInterface>) {
                this.goToQuestionDetails(event.data.id);
            },
            goToQuestionDetails(id: number) {
                this.$router.push(`/question/${id}`)
            },
            goToQuestionCreate() {
                this.$router.push(`/question/create`);
            },
            onPage(event: DataTablePageEvent) {
                this.saveCurrentPageSelections();
                this.filter = UtilEntity.updateFilterOnPage(event, this.filter);
                this.initQuestionList();
            },
            onSort(event: DataTablePageEvent) {
                this.filter = UtilEntity.updateFilterOnSort(event, this.filter);
                this.initQuestionList();
            },
            openDeleteAllModal() {
                this.displayDeleteAllModal = true;
            },
            closeDeleteAllModal() {
                this.displayDeleteAllModal = false;
            },
            openFilterPanel() {
                this.displayFilterPanel = true;
            },
            closeFilterPanel() {
                this.displayFilterPanel = false;
            },
            saveCurrentPageSelections() {
                const currentPageIds: number[] = this.questionList.map((q) => q.id);
                this.allSelectedQuestions = this.allSelectedQuestions.filter(
                    (q) => !currentPageIds.includes(q.id)
                );

                this.allSelectedQuestions.push(...this.selectedQuestions);
            },
            resetFilter() {
                this.filter.difficulty = null;
            }
        },
        computed: {
            canDeleteAll() {
                return this.allSelectedQuestions.length > 0;
            },
        },
        watch: {
            'selectedQuestions'(newVal, oldVal) {
                if (newVal && newVal !== oldVal) this.saveCurrentPageSelections();
            }
        },
        components: {
            DataTable,
            Column,
            CodeBlock,
            ButtonCustom,
            TagBadge,
            ModalCancel,
            InputCheck,
            FilterPanel,
            InputSelect,
            Title,
        },
    }
</script>

<template>

    <Title content="Liste des questions"></Title>

    <section v-if="isAdmin" class="row mb-3">
        <aside class="col text-start">
            <ButtonCustom 
                v-if="canDeleteAll"
                content="Supprimer"
                buttonClass="btn-danger"
                @click="openDeleteAllModal"
            />
        </aside>
        <aside class="col text-end">
            <ButtonCustom 
                content="Créer une question"
                @click="goToQuestionCreate"
            />

            <ButtonCustom 
                content="Filtrer"
                buttonClass="ms-3 btn-primary"
                @click="openFilterPanel"
            />

        </aside>
    </section>

    <section>
        <DataTable 
            :value="questionList" 
            v-model:selection="selectedQuestions"
            dataKey="id"
            class="p-datatable-sm compact-table"
            :lazy="true"
            :paginator="true"
            :rows="10"
            :totalRecords="item.totalElement"
            @page="onPage"
            @sort="onSort"
        >
            <template #empty>Aucune questions à afficher</template>
            <Column selectionMode="multiple" style="width: 5%;"></Column>

            <Column header="Id" field="id" sortable style="width: 5%;">
                <template #body="slotProps" >
                    <span @click="goToQuestionDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.id }}
                    </span>
                    
                </template>
            </Column>
            <Column header="Question" field="content" sortable style="width: 25%;">
                <template #body="slotProps">
                    <span @click="goToQuestionDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.content }}
                    </span>
                </template>
            </Column>
            <Column field="code" style="width: 40%;">
                    <template #body="slotProps">
                        <CodeBlock
                            v-if="slotProps.data.code"
                            :content="slotProps.data.code"
                        />
                    </template>
            </Column>
            <Column header="Tag" field="tags" style="width: 10%;">
                <template #body="slotProps">
                    <TagBadge
                        v-for="tag in slotProps.data.tagList"
                        :key="tag.id"
                        :content="tag.label"
                    />
                </template>
            </Column>
            <Column header="Difficulté" field="difficulty" sortable style="width: 5%;">
                <template #body="slotProps">
                    {{  displayLabelDifficulty(slotProps.data.difficulty) }}
                </template>
            </Column>
            <Column v-if="isAdmin" header="Action" style="width: 5%;">
                <template #body="slotProps">
                    <i 
                        class="pi pi-trash" 
                        style="color: red" 
                        @click="openDeleteModal(slotProps.data.id)"
                        title="Supprimer cette question"
                    >
                    </i>
                    <i 
                        class="pi pi-eye text-primary ms-2"
                        @click="goToQuestionDetails(slotProps.data.id)"
                        title="Détails de la question"
                    >
                    </i>
                </template>
            </Column>
            
        </DataTable>
    </section>

    <!-- *************** DELETE *************** -->
    <ModalCancel
        :visible="displayDeleteModal" 
        @close="closeDeleteModal"
        @submit="deleteQuestion"
        title="Supprimer une question"
        submitLabel="Supprimer"
    >
        <template #content>
            <i class="pi pi-exclamation-triangle text-danger" style="font-size: 2rem"></i>
            <p>Etes vous sur de vouloir supprimer cette question ?</p>
        </template>
    </ModalCancel>

    <!-- *************** DELETE ALL *************** -->
    <ModalCancel
        :visible="displayDeleteAllModal" 
        @close="closeDeleteAllModal"
        @submit="deleteAllQuestions"
        title="Supprimer des questions"
        submitLabel="Supprimer"
    >
        <template #content>
            <i class="pi pi-exclamation-triangle text-danger" style="font-size: 2rem"></i>
            <p>{{ allSelectedQuestions.length }} question{{ allSelectedQuestions.length > 1 ? 's' : '' }} sélectionnée{{ allSelectedQuestions.length > 1 ? 's' : '' }}</p>
            <p>Etes vous sur de vouloir supprimer {{ allSelectedQuestions.length > 1 ? 'ces' : 'cette' }} question{{ allSelectedQuestions.length > 1 ? 's' : '' }}?</p>
        </template>
    </ModalCancel>

    <!-- *************** FILTER *************** -->
    <FilterPanel 
        :isActive="displayFilterPanel"
        :filter="filter"
        @onClose="closeFilterPanel"
        @onFilter="initQuestionList"
        @onReset="resetFilter"
    >
        <template #content>

            <section class="row mb-3">
                <div class="col-md-12">
                    <InputSelect 
                        v-model="filter.difficulty"
                        name="difficulty"
                        label="Difficulté"
                        :options="difficultyOptions"
                        :inline="true"
                    />
                </div>
            </section>

        </template>
    </FilterPanel>
</template>

<style scoped>
    .compact-table .p-datatable-table {
        table-layout: fixed;
        width: 100%;
    }
</style>

