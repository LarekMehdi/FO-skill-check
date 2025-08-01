<script lang="ts">
import { useToast } from 'vue-toastification';
import { TestService } from '../../../services/TestService';
import type { TestDetailsInterface } from '../../../interfaces/test.interface';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import InputNumber from '../../ui/InputNumber.vue';
import { useAuth } from '../../../composables/useAuth';
import Modal from '../../shared/Modal.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import type { QuestionInterface } from '../../../interfaces/question.interface';
import type { GenericFilter } from '../../../interfaces/filter.interface';
import { QuestionService } from '../../../services/QuestionService';

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
                    questions: []
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
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async getAllQuestions() {
                try {
                    this.questionList = await QuestionService.findAll(this.questionFilter);
                    console.log(this.questionList);
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            openAddQuestionModal() {
                this.displayAddQuestionModal = true;
            },
            closeAddQuestionModal() {
                this.displayAddQuestionModal = false;
            },
            addQuestions() {

            },
        },
        computed: {
            getQuestionCount(): number {
                return this.item?.questions?.length ?? 0;
            },
            getTimeLimitSymbol(): string {
                const tl: number = this.item.timeLimit;
                if (tl > 60 ) {
                    return tl/60 > 2 ? 'minutes' : 'minute';
                }
                return tl > 0 ? 'secondes' : 'seconde';
            }
        },
        components: {
            InputTextArea,
            InputText,
            InputNumber,
            Modal,
            ButtonCustom,
        },
    }
</script>

<template>
    <h1>{{ item.title }}</h1>
    <section v-if="isAdmin" class="row mb-3">
        <aside class="col text-end">
            <ButtonCustom 
                content="Ajouter des questions"
                @click="openAddQuestionModal"
            />
        </aside>
    </section>

    <section>
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
                    v-model="item.successRate"
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
                    v-model="item.timeLimit"
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
        
    </section>

    <section v-if="getQuestionCount > 0">
        <h5>Liste des questions</h5>
    </section>


    <Modal 
        :visible="displayAddQuestionModal" 
        @close="closeAddQuestionModal"
        @submit="addQuestions"
        title="Ajouter des questions"
        submitLabel="Ajouter"
    >

    </Modal>
    
</template>