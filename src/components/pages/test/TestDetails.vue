<script lang="ts">
import { useToast } from 'vue-toastification';
import { TestService } from '../../../services/TestService';
import type { TestDetailsInterface } from '../../../interfaces/test.interface';
import InputTextArea from '../../ui/InputTextArea.vue';
import InputText from '../../ui/InputText.vue';
import InputNumber from '../../ui/InputNumber.vue';

    export default {
        setup() {
            const toast = useToast();
            return {
                toast,
            }
        },
        mounted() {
            this.testId = Number(this.$route.params.id);
            this.initDetails();
        },
        data(): {
            testId: number,
            item: TestDetailsInterface,
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
                }
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
        },
        computed: {
            displayTimeLimit(): string {
                const tl: number = this.item.timeLimit;
                if (tl >= 60) return `${tl / 60} minute${tl/60 >= 2 ? 's' : ''}`;
                return `${tl} secondes`;
            },
            getQuestionCount() {
                return this.item?.questions?.length ?? 0;
            }
        },
        components: {
            InputTextArea,
            InputText,
            InputNumber,
        },
    }
</script>

<template>
    <h1>{{ item.title }}</h1>

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
    
</template>