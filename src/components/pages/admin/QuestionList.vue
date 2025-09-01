<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { QuestionListInterface } from '../../../interfaces/question.interface';
import type { GenericFilter, PageInterface } from '../../../interfaces/filter.interface';
import { QuestionService } from '../../../services/QuestionService';
import { UtilEntity } from '../../../utils/UtilEntity';
import type { TagInterface } from '../../../interfaces/tag.interface';
import CodeBlock from '../../ui/CodeBlock.vue';
import { getDifficultyLabel, type Difficulty } from '../../../constants/difficulty.constant';


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
            this.initQuestionList();
        },
        data(): {item: PageInterface<QuestionListInterface>, questionList: QuestionListInterface[], filter: GenericFilter} {
            return {
                item: {
                    datas: [],
                    totalElement: 0
                },
                questionList: [],
                filter: {
                    limit: 10,
                    offset: 0
                }
            }
        },
        methods: {
            async initQuestionList() {
                this.item = await QuestionService.findAll(this.filter);
                this.questionList = this.item.datas;
            },
            displayLabelDifficulty(value: Difficulty) {
                return getDifficultyLabel(value);
            },
            onRowClick(event: DataTableRowClickEvent<QuestionListInterface>) {
                this.goToQuestionDetails(event.data.id);
            },
            goToQuestionDetails(id: number) {
                this.$router.push(`/question/${id}`)
            },
            onPage(event: DataTablePageEvent) {
                this.filter = UtilEntity.updateFilterOnPage(event, this.filter);
                this.initQuestionList();
            },
            onSort(event: DataTablePageEvent) {
                this.filter = UtilEntity.updateFilterOnSort(event, this.filter);
                this.initQuestionList();
            },
        },
        components: {
            DataTable,
            Column,
            CodeBlock,
        },
    }
</script>

<template>
    <h1 class="mb-5">Liste des questions</h1>

    <section>
        <DataTable 
            :value="questionList" 
            tableStyle="min-width: 50rem" 
            :lazy="true"
            :paginator="true"
            :rows="10"
            :totalRecords="item.totalElement"
            @page="onPage"
            @sort="onSort"
        >
            <template #empty>Aucune questions à afficher</template>
            <Column header="Id" field="id" sortable style="width: 10%;">
                <template #body="slotProps" >
                    <span @click="goToQuestionDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.id }}
                    </span>
                    
                </template>
            </Column>
            <Column header="Question" field="content" sortable style="width: 40%;">
                <template #body="slotProps">
                    <span @click="goToQuestionDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.content }}
                    </span>
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
    </section>
</template>

