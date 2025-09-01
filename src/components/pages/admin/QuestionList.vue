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
            ButtonCustom,
            TagBadge,
        },
    }
</script>

<template>
    <h1 class="mb-5">Liste des questions</h1>
    <section v-if="isAdmin" class="row mb-3">
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
            tableStyle="min-width: 50rem" 
            :lazy="true"
            :paginator="true"
            :rows="10"
            :totalRecords="item.totalElement"
            @page="onPage"
            @sort="onSort"
        >
            <template #empty>Aucune questions à afficher</template>
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
            <Column field="code" style="width: 25%;">
                    <template #body="slotProps">
                        <CodeBlock
                            v-if="slotProps.data.code"
                            :content="slotProps.data.code"
                        />
                    </template>
            </Column>
            <Column header="Tag" field="tags" style="width: 15%;">
                <template #body="slotProps">
                    <TagBadge
                        v-for="tag in slotProps.data.tagList"
                        :key="tag.id"
                        :content="tag.label"
                    />
                </template>
            </Column>
            <Column header="Difficulté" field="difficulty" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  displayLabelDifficulty(slotProps.data.difficulty) }}
                </template>
            </Column>
            <Column header="Nombre de fois répondu" field="doneCount" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  slotProps.data.doneCount }}
                </template>
            </Column>
            <Column header="Taux de réussite" field="successRate" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{ displaySuccessRate(slotProps.data.successRate) }} %
                </template>
            </Column>
            
        </DataTable>
    </section>
</template>

