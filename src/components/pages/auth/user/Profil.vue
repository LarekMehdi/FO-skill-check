<script lang="ts">
import { Column, DataTable, type DataTableRowClickEvent } from 'primevue';
import { useAuth } from '../../../../composables/useAuth';
import { Role } from '../../../../constants/role.constant';
import type { UserDetailsInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';
import InputText from '../../../ui/InputText.vue';
import type { UserTestSessionInterface } from '../../../../interfaces/testSession.interface';

    export default {
        mounted() {
            this.initUserDetails();
        },
        setup() {
            const { isAdmin, userId } = useAuth();
            return { isAdmin, userId }
        },
        data(): { idParam: number, item: UserDetailsInterface} {
            return {
                idParam: Number(this.$route.params.id),
                item: {
                    id: 0,
                    pseudo: '',
                    role: Role.USER,
                    sessionList: []
                }
            }
        },
        methods: {
            async initUserDetails() {
                this.item = await UserService.findDetails(this.idParam);
                console.log(this.item);
            },
            onRowClick(event: DataTableRowClickEvent<UserTestSessionInterface>) {
                console.log(event);
            }
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
        },
    }
</script>

<template>
    <h1>{{  displayTitle }}</h1>
    <article>
        <section class="row mb-3">
            <div class="col-md-6">
                <InputText
                    v-model="item.pseudo"
                    name="pseudo"
                    placeholder="Pseudo"
                    :displayLabel="false"
                    :disabled="true"
                />
            </div>
            <div class="col-md-6">
                <InputText
                    v-model="item.email"
                    name="email"
                    placeholder="Email"
                    :displayLabel="false"
                    :disabled="true"
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
                        {{  slotProps.data.createdAt }}
                    </template>
                </Column>
                <Column header="Taux de réussite" style="width: 30%;">
                    <template #body="slotProps">
                        {{ slotProps.data.successRate }}
                    </template>
                </Column>
            </DataTable>
        </section>
    </article>
</template>