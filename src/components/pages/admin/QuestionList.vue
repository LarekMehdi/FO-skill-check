<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { QuestionListInterface } from '../../../interfaces/question.interface';
import type { GenericFilter, PageInterface } from '../../../interfaces/filter.interface';
import { QuestionService } from '../../../services/QuestionService';
import { UtilEntity } from '../../../utils/UtilEntity';
import CodeBlock from '../../ui/CodeBlock.vue';
import { getDifficultyLabel, type Difficulty } from '../../../constants/difficulty.constant';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import TagBadge from '../../ui/TagBadge.vue';
import ModalCancel from '../../shared/ModalCancel.vue';
import InputCheck from '../../ui/InputCheck.vue';


    export default {
        setup() {
            const toast = useToast();
            const { isAdmin } = useAuth(); 
            return {
                toast,
                isAdmin,
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
            filter: GenericFilter, 
            displayDeleteModal: boolean,
            displayDeleteAllModal: boolean,
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
                    offset: 0
                },
                displayDeleteModal: false,
                displayDeleteAllModal: false,
                questionIdToDelete: null,
                selectedQuestions: [],
                allSelectedQuestions: [],
            }
        },
        methods: {
            async initQuestionList() {
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
                this.allSelectedQuestions = [
                    ...this.allSelectedQuestions.filter(
                    q => !this.selectedQuestions.some(sq => sq.id === q.id)
                    ),
                    ...this.selectedQuestions
                ];
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
        },
        computed: {
            canDeleteAll() {
                return this.allSelectedQuestions.length > 0;
            },
        },
        components: {
            DataTable,
            Column,
            CodeBlock,
            ButtonCustom,
            TagBadge,
            ModalCancel,
            InputCheck,
        },
    }
</script>

<template>
    <h1 class="mb-5">Liste des questions</h1>
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
</template>

<style scoped>
    .compact-table .p-datatable-table {
        table-layout: fixed;
        width: 100%;
    }
</style>

