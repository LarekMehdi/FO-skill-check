<script lang="ts">
import useVuelidate from '@vuelidate/core';
import Modal from '../../shared/Modal.vue';
import ButtonCustom from '../../ui/ButtonCustom.vue';
import InputText from '../../ui/InputText.vue';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { withMessage } from '../../../utils/withMessage';
import type { CreateTagInterface, TagInterface } from '../../../interfaces/tag.interface';
import { useToast } from 'vue-toastification';
import { TagService } from '../../../services/TagService';
import { Column, DataTable } from 'primevue';


    export default {
        setup() {
            const toast = useToast();
            return {
                v$: useVuelidate(),
                toast,
            }
        },
        validations() {
            return {
                newTag: {
                    label: { 
                        required: withMessage("Le label est requis", required),
                        minLength: withMessage("Le label doit faire au moins 2 charactères", minLength(2)),
                        maxLength: withMessage("Le label doit faire moins de 50 charactères", maxLength(50)),
                    }
                },
                updateTag: {
                    label: { 
                        required: withMessage("Le label est requis", required),
                        minLength: withMessage("Le label doit faire au moins 2 charactères", minLength(2)),
                        maxLength: withMessage("Le label doit faire moins de 50 charactères", maxLength(50)),
                    }
                },
            }
        },
        
        data(): {
            tags: TagInterface[],
            displayAddModal: boolean,
            displayUpdateModal: boolean,
            newTag: CreateTagInterface,
            updateTag: TagInterface,
        } {
            return {
                tags: [],
                displayAddModal: false,
                displayUpdateModal: false,
                newTag: { label: ''},
                updateTag: { id: undefined, label: ''}
            }
        },
        mounted() {
            this.initTagList();
        },
        methods: {
            async initTagList() {
                try {
                    this.tags = await TagService.findAll();
                } catch (e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            resetNewTag() {
                this.newTag = { label: ''};
            },
            openAddTagModal() {
                this.displayAddModal = true;
            },
            closeAddTagModal() {
                this.displayAddModal = false;
                this.resetNewTag();
            },
            openUpdateTagModal(id: number) {
                const tag: TagInterface | undefined = this.tags.find((t) => t.id === id);
                if (!tag) return;
                this.updateTag = {...tag};
                this.displayUpdateModal = true;
            },
            closeUpdateTagModal() {
                this.displayUpdateModal = false;
            },
            async addTag() {
                this.v$.$touch();
                if (this.v$.newTag.$invalid) return;

                try {
                    await TagService.create(this.newTag);
                    this.toast.success("Tag ajouté avec succés");
                    this.closeAddTagModal();
                    this.initTagList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async update() {
                this.v$.$touch();
                if (this.v$.updateTag.$invalid) return;

                try {
                    await TagService.update(this.updateTag);
                    this.closeUpdateTagModal();
                    this.toast.success("Tag modifié avec succés");
                    this.initTagList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            async deleteTag(id: number) {
                try {
                    await TagService.deleteById(id);
                    this.toast.success("Tag supprimé avec succés");
                    this.initTagList();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            }
        },
        components: {
            Modal,
            ButtonCustom,
            InputText,
            DataTable,
            Column
        }
    }
</script>

<template>
  
    <h1 class="mb-5">Liste des tags</h1>
    <section class="row mb-3">
        <aside class="col text-end">
            <ButtonCustom 
                content="Ajouter un tag"
                @click="openAddTagModal"
            />
        </aside>
    </section>

    <section>
        <DataTable :value="tags" tableStyle="min-width: 50rem">
            <template #empty>Aucun tag à afficher</template>
            <Column header="Id" field="id" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  slotProps.data.id }}
                </template>
            </Column>
            <Column header="Label" field="label" sortable style="width: 60%;">
                <template #body="slotProps">
                    {{  slotProps.data.label }}
                </template>
            </Column>
            <Column header="Action" style="width: 20%;">
                <template #body="slotProps">
                    <ButtonCustom content="Modifier" @click="openUpdateTagModal(slotProps.data.id)"/>
                </template>
            </Column>
            <Column header="" style="width: 10%;">
                <template #body="slotProps">
                     <i 
                        class="pi pi-trash" 
                        style="color: red" 
                        @click="deleteTag(slotProps.data.id)"
                        title="Supprimer cette réponse"
                    >
                    </i>
                </template>
            </Column>
        </DataTable>
    </section>

    <!-- ************** CREATE ************$ -->
    <Modal 
        :visible="displayAddModal" 
        @close="closeAddTagModal"
        @submit="addTag"
        title="Ajouter un tag"
        submitLabel="Ajouter"
    >
        <template #content>
            <InputText
                v-model="newTag.label"
                name="label"
                placeholder="Label"
                :displayLabel="false"
                :validation="v$.newTag.label"
            />
        </template>
    </Modal>

    <!-- ************** UPDATE ************$ -->
    <Modal 
        :visible="displayUpdateModal" 
        @close="closeUpdateTagModal"
        @submit="update"
        title="Modifier un tag"
        submitLabel="Modifier"
    >
        <template #content>
            <InputText
                v-model="updateTag.label"
                name="label"
                placeholder="Label"
                :displayLabel="false"
                :validation="v$.updateTag.label"
            />
        </template>
    </Modal>



</template>