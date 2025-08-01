<script lang="ts">
import useVuelidate from '@vuelidate/core';
import type { CreateTestInterface, TestInterface } from '../../../interfaces/test.interface';

import { useToast } from 'vue-toastification';


import { maxLength, required } from '@vuelidate/validators';
import { withMessage } from '../../../utils/withMessage';
import { TestService } from '../../../services/TestService';



import type { GenericFilter } from '../../../interfaces/filter.interface';
import { Column, DataTable } from 'primevue';
import { useAuth } from '../../../composables/useAuth';
import Modal from '../../shared/Modal.vue';
import InputText from '../../ui/InputText.vue';
import InputTextArea from '../../ui/InputTextArea.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';


    export default {
        setup() {
            const { isAdmin } = useAuth();
            const toast = useToast();
            return {
                v$: useVuelidate(),
                toast,
                isAdmin,
            }
        },
        mounted() {
            this.initTestList();
        },
        data(): {
            filter: GenericFilter;
            testList: TestInterface[];
            displayAddTestModal: boolean;
            newTest: CreateTestInterface;
        } {
            return {
                filter: { limit: 10, offset: 0},
                testList: [],
                displayAddTestModal: false,
                newTest: { title: '', description: ''}
            }
            
        },
        validations() {
            return {
                newTest: {
                    title: {
                        required:  withMessage("Le titre est requis", required),
                        maxLength: withMessage("Le titre doit faire moins de 100 charactères", maxLength(100))
                    },
                    description: {
                        required:  withMessage("La description est requise", required),
                        maxLength: withMessage("La description doit faire moins de 500 charactères", maxLength(500))
                    }
                }
            }
        },
        methods: {
            async initTestList() {
                try {
                    const result = await TestService.findAll(this.filter);
                    this.testList = result.content;

                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            openAddTestModal() {
                this.displayAddTestModal = true;
            },
            closeAddTestModal() {
                this.displayAddTestModal = false;
                this.resetNewTest();
            },
            async addTest() {
                this.v$.$touch();
                if (this.v$.$invalid) return;

                try {
                    await TestService.create(this.newTest);
                    this.toast.success("Test ajouté avec succés");
                    this.closeAddTestModal();
                    this.resetNewTest();
                    this.initTestList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            resetNewTest() {
                this.newTest = {
                    title: '',
                    description: '',
                }
            },
            goToDetailsTest(id: number) {
                this.$router.push(`/test/${id}`);
            },
        },
        components: {
            Modal,
            InputText,
            InputTextArea,
            ButtonCustom,
            DataTable,
            Column,
        }
    }
</script>

<template>
   
    <h1>Liste des tests</h1>
    <section v-if="isAdmin" class="row mb-3">
        <aside class="col text-end">
            <ButtonCustom 
                content="Ajouter un test"
                @click="openAddTestModal"
            />
        </aside>
    </section>

    <section>
        <DataTable :value="testList" tableStyle="min-width: 50rem">
            <Column header="Titre" field="title" sortable style="width: 20%;">
                <template #body="slotProps">
                    {{  slotProps.data.title }}
                </template>
            </Column>
            <Column header="Description" field="description" sortable style="width: 70%;">
                <template #body="slotProps">
                    {{  slotProps.data.description }}
                </template>
            </Column>
            <Column v-if="isAdmin" header="Action" style="width: 10%;">
                <template #body="slotProps">
                    <ButtonCustom content="Détails" @click="goToDetailsTest(slotProps.data.id)"/>
                </template>
            </Column>
        </DataTable>
    </section>
    
    <!-- *************** CREATE *************** -->
     <Modal 
        :visible="displayAddTestModal" 
        @close="closeAddTestModal"
        @submit="addTest"
        title="Ajouter un test"
        submitLabel="Ajouter"
    >
        <template #content>
            
            <section class="row mb-3">
                <div class="col-md-12">
                    <InputText
                        v-model="newTest.title"
                        name="title"
                        placeholder="Titre"
                        :displayLabel="false"
                        :validation="v$.newTest.title"
                        :isRequired="true"
                    />
                </div>
            </section>

            <section class="row mb-3">
                <div class="col-md-12">
                    <InputTextArea
                        v-model="newTest.description"
                        name="description"
                        placeholder="Description"
                        :displayLabel="false"
                        :validation="v$.newTest.description"
                        :cols="70"
                        :rows="4"
                        :isRequired="true"
                    />
                </div>
            </section>
        </template>
    </Modal>

</template>