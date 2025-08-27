<script lang="ts">
import useVuelidate from '@vuelidate/core';
import type { CreateTestInterface, TestInterface } from '../../../interfaces/test.interface';

import { useToast } from 'vue-toastification';


import { maxLength, required } from '@vuelidate/validators';
import { withMessage } from '../../../utils/withMessage';
import { TestService } from '../../../services/TestService';



import type { TestListFilterInterface } from '../../../interfaces/filter.interface';
import { Column, DataTable } from 'primevue';
import { useAuth } from '../../../composables/useAuth';
import Modal from '../../shared/Modal.vue';
import InputText from '../../ui/InputText.vue';
import InputTextArea from '../../ui/InputTextArea.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import ModalCancel from '../../shared/ModalCancel.vue';


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
            filter: TestListFilterInterface;
            testList: TestInterface[];
            displayAddTestModal: boolean;
            displayConfirmDeletetModal: boolean;
            newTest: CreateTestInterface;
            file: File | null;
            testIdToDelete: number | null;
        } {
            return {
                filter: { limit: 10, offset: 0},
                testList: [],
                displayAddTestModal: false,
                displayConfirmDeletetModal: false,
                newTest: { title: '', description: ''},
                file: null,
                testIdToDelete: null,
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
                    this.file = null;

                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async exportList() {
                try {
                    await TestService.exportAll(this.filter);
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de l'export");
                }
            },
            async importExcel() {
                try {
                    if (!this.file) {
                        this.toast.warning("Aucun fichier à importer");
                        return;
                    } 
                    await TestService.importExcel(this.file);
                    this.toast.success("Données importées avec succés");
                    this.initTestList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de l'import");
                }
            },
            openAddTestModal() {
                this.displayAddTestModal = true;
            },
            closeAddTestModal() {
                this.displayAddTestModal = false;
                this.resetNewTest();
            },
            openConfirmDeleteModal(id: number) {
                this.displayConfirmDeletetModal = true;
                this.testIdToDelete = id;
            },
            closeConfirmDeleteModal() {
                this.displayConfirmDeletetModal = false;
                this.testIdToDelete = null;
            },
            async deleteTest() {
                if (!this.testIdToDelete) {
                    this.toast.error("Pas de test selectionné pour la suppression");
                    return;
                }
                try {
                    await TestService.deleteTest(this.testIdToDelete);
                    this.closeConfirmDeleteModal();
                    this.toast.success("Test supprimé avec succés");
                    this.initTestList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue lors de la suppression");
                }
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
            selectFile() {
                (this.$refs.fileInput as HTMLInputElement).click();
            },
            onFileChange(event: Event) {
                const target = event.target as HTMLInputElement;
                if (target.files && target.files.length > 0) {
                    this.file = target.files[0];
                    this.importExcel();
                }
            },
        },
        components: {
            Modal,
            InputText,
            InputTextArea,
            ButtonCustom,
            DataTable,
            Column,
            ModalCancel,
        }
    }
</script>

<template>
   
    <h1 class="mb-5">Liste des tests</h1>
    <section v-if="isAdmin" class="row mb-3">
        <aside class="col text-start">
            <ButtonCustom 
                content="Exporter"
                buttonClass="btn-success"
                @click="exportList"
            />
            <ButtonCustom 
                content="Importer Excel"
                buttonClass="btn-warning ms-3"
                @click="selectFile"
            />
            <!-- TODO: Composant InputFile -->
            <input 
                type="file" 
                accept=".xlsx,.xls" 
                ref="fileInput" 
                style="display: none" 
                @change="onFileChange"
            />
        </aside>
        <aside class="col text-end">
            <ButtonCustom 
                content="Ajouter un test"
                @click="openAddTestModal"
            />
        </aside>
    </section>

    <section>
        <DataTable :value="testList" tableStyle="min-width: 50rem">
            <template #empty>Il n'y aucun test pour le moment</template>
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
            <Column header="Action" style="width: 10%;">
                <template #body="slotProps">
                    <div style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
                        <ButtonCustom content="Détails" @click="goToDetailsTest(slotProps.data.id)"/>
                    
                        <i  v-if="isAdmin"
                            class="pi pi-trash" 
                            style="color: red" 
                            @click="openConfirmDeleteModal(slotProps.data.id)"
                            title="Supprimer ce test"
                        >
                        </i>
                    </div>
                    
                    
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

    <ModalCancel
        :visible="displayConfirmDeletetModal" 
        @close="closeConfirmDeleteModal"
        @submit="deleteTest"
        title="Supprimer un test"
        submitLabel="Supprimer"
    >
        <template #content>
            <i class="pi pi-exclamation-triangle text-danger" style="font-size: 2rem"></i>
            <p>Etes vous sur de vouloir supprimer ce test?</p>
            <p>Cela va aussi supprimer toutes les sessions liées.</p>
        </template>
    </ModalCancel>

</template>