<script lang="ts">
import { Column, DataTable } from 'primevue';
import type { UserInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';

    export default {
        mounted() {
            this.initUserList();
        },
        data(): {items: UserInterface[]} {
            return {
                items: []
            }
        },
        methods: {
            async initUserList() {
                this.items = await UserService.findAll();
            },
        },
        components: {
            DataTable,
            Column,
        },
    }
</script>

<template>
    <h1 class="mb-5">Liste des utilisateurs</h1>

    <section>
        <DataTable :value="items" tableStyle="min-width: 50rem">
            <template #empty>Aucun utilisateurs à afficher</template>
            <Column header="Id" field="id" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  slotProps.data.id }}
                </template>
            </Column>
            <Column header="Pseudo" field="pseudo" sortable style="width: 40%;">
                <template #body="slotProps">
                    {{  slotProps.data.pseudo }}
                </template>
            </Column>
            <Column header="Email" field="email" sortable style="width: 40%;">
                <template #body="slotProps">
                    {{  slotProps.data.email }}
                </template>
            </Column>
            <Column header="Role" field="role" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  slotProps.data.role }}
                </template>
            </Column>
        </DataTable>
    </section>
</template>