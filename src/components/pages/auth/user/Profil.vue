<script lang="ts">
import { Column, DataTable, type DataTableRowClickEvent } from 'primevue';
import { useAuth } from '../../../../composables/useAuth';
import { Role } from '../../../../constants/role.constant';
import type { UserDetailsInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';
import InputText from '../../../ui/InputText.vue';
import type { UserTestSessionInterface } from '../../../../interfaces/testSession.interface';
import { UtilDate } from '../../../../utils/UtilDate';
import { useToast } from 'vue-toastification';
import ButtonCustom from '../../../ui/ButtonCustom.vue';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { withMessage } from '../../../../utils/withMessage';
import useVuelidate from '@vuelidate/core';

    export default {
        mounted() {
            this.initUserDetails();
        },
        setup() {
            const { isAdmin, userId } = useAuth();
            const toast = useToast();
            return { isAdmin, userId, toast, v$: useVuelidate() }
        },
        data(): { idParam: number, item: UserDetailsInterface, isUpdateOn: boolean} {
            return {
                idParam: Number(this.$route.params.id),
                item: {
                    id: 0,
                    pseudo: '',
                    email: '',
                    role: Role.USER,
                    sessionList: [],
                },
                isUpdateOn: false,
            }
        },
        validations() {
            return {
                item: {
                    pseudo: { 
                        required: withMessage('Le pseudo est requis', required),
                        minLength: withMessage('Le pseudo doit faire au moins 2 charactères', minLength(2)),
                        maxLength: withMessage('Le pseudo doit faire moins de 50 charactères', maxLength(50)),
                    },
                    email: { 
                        required: withMessage("L'adresse email est requise", required),
                        email: withMessage("L'adresse email n'est pas valide", email)
                    },
                }
            }
        },
        methods: {
            async initUserDetails() {
                this.item = await UserService.findDetails(this.idParam);
            },
            async update() {
                this.v$.$touch();
                if (this.v$.$invalid) return;
                
                try {
                    await UserService.updateProfil(this.item);

                    this.isUpdateOn = false;
                    this.toast.success("Profil mis à jour avec succés");
                    this.initUserDetails();

                } catch(e: unknown) {
                    this.toast.error("Une erreur est survenue");
                }
            },
            onRowClick(event: DataTableRowClickEvent<UserTestSessionInterface>) {
                this.$router.push(`/test/${event.data.testId}/result/${event.data.sessionId}`);
            },
            displayDate(date: Date) {
                return UtilDate.displayDateFr(date);
            },
            toggleUpdateItemOn() {
                this.isUpdateOn = true;
            },
        },
        computed: {
            isMyId() {
                return Number(this.userId) === this.idParam;
            },
            displayTitle() {
                return this.isMyId ? 'Mon profil' : `Profil de ${this.item.pseudo}`;
            },
            displayEmptySession() {
                return this.isMyId ? "Vous n'avez pas encore passé de test" : `${this.item.pseudo} n'a pas encore passé de test`;
            },
        },
        watch: {
            '$route.params.id'(newVal: string, oldVal: string) {
                if (Number(newVal) !== Number(oldVal)) {
                    this.idParam = Number(newVal);
                }
            },
            'idParam'(newVal: number, oldVal: number) {
                if (newVal !== oldVal) this.initUserDetails();
            }
        },
        components: {
            InputText,
            DataTable,
            Column,
            ButtonCustom,
        },
    }
</script>

<template>
    <h1 class="mb-5">{{  displayTitle }}</h1>
    <article>
        <section class="row mb-3">
            <div class="col-md-5">
                <InputText
                    v-model="item.pseudo"
                    name="pseudo"
                    placeholder="Pseudo"
                    :displayLabel="false"
                    :disabled="!isUpdateOn"
                    :validation="v$.item.pseudo"
                />
            </div>
            <div class="col-md-5">
                <InputText
                    v-model="item.email"
                    name="email"
                    placeholder="Email"
                    :displayLabel="false"
                    :disabled="!isUpdateOn"
                    :validation="v$.item.email"
                />
            </div>
            <div class="col-md-2 d-flex align-items-center justify-content-center">
                <i 
                    v-if="!isUpdateOn"
                    class="pi pi-pen-to-square primary" 
                    style="font-size: 1.5rem; color: var(--bs-primary)"
                    @click="toggleUpdateItemOn"
                >
                </i>
                <ButtonCustom 
                    v-else
                    content="Sauvegarder" 
                    @click="update"
                />
            </div>
        </section>
    </article>

    <article>
        <section>
            <DataTable :value="item.sessionList" tableStyle="min-width: 50rem" @row-click="onRowClick">
                <template #empty>{{ displayEmptySession }}</template>
                <Column header="Test" field="testTitle" sortable style="width: 50%;">
                    <template #body="slotProps">
                        {{  slotProps.data.testTitle }}
                    </template>
                </Column>
                <Column header="Date" field="createdAt" sortable style="width: 20%;">
                    <template #body="slotProps">
                        {{ displayDate(slotProps.data.createdAt) }}
                    </template>
                </Column>
                <Column header="Taux de réussite" field="successRate" sortable style="width: 30%;">
                    <template #body="slotProps">
                        {{ slotProps.data.successRate }} %
                    </template>
                </Column>
            </DataTable>
        </section>
    </article>
</template>

<style scoped>
    :deep(.p-datatable tbody tr:hover) {
        cursor: pointer;
    }
</style>