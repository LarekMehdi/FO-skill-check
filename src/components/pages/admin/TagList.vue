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
                }
            }
        },
        
        data(): {tags: TagInterface[], displayModal: boolean, newTag: CreateTagInterface} {
            return {
                tags: [],
                displayModal: false,
                newTag: { label: ''},
            }
        },
        mounted() {
            this.initTagList();
        },
        methods: {
            async initTagList() {
                try {
                    this.tags = await TagService.findAll();
                    console.log('tags => ', this.tags);
                } catch (e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            openAddTagModal() {
                this.displayModal = true;
            },
            closeAddTagModal() {
                this.displayModal = false;
            },
            async addTag() {
                this.v$.$touch();
                if (this.v$.$invalid) return;

                try {
                    await TagService.create(this.newTag);
                    this.toast.success("Tag ajouté avec succés");
                    this.closeAddTagModal();
                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
        },
        components: {
            Modal,
            ButtonCustom,
            InputText,
        }
    }
</script>

<template>
  
    <h1>Liste des tags</h1>
    <section class="row mb-3">
        <aside class="col text-end">
            <ButtonCustom 
                content="Ajouter un tag"
                @click="openAddTagModal"
            />
        </aside>
        
    </section>

    <Modal 
        :visible="displayModal" 
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



</template>