<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import type { UserInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';
import type { GenericFilter, PageInterface } from '../../../../interfaces/filter.interface';
import { UtilEntity } from '../../../../utils/UtilEntity';

    export default {
        mounted() {
            this.initUserList();
        },
        data(): {item: PageInterface<UserInterface>, userList: UserInterface[], filter: GenericFilter} {
            return {
                item: {
                    datas: [],
                    totalElement: 0
                },
                userList: [],
                filter: {
                    limit: 2,
                    offset: 0
                }
            }
        },
        methods: {
            async initUserList() {
                this.item = await UserService.findAll(this.filter);
                this.userList = this.item.datas;
            },
            onRowClick(event: DataTableRowClickEvent<UserInterface>) {
                this.$router.push(`/user/${event.data.id}`)
            },
            onPage(event: DataTablePageEvent) {
                this.filter = UtilEntity.updateFilterOnPage(event, this.filter);
                this.initUserList();
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
        <DataTable 
            :value="userList" 
            tableStyle="min-width: 50rem" 
            :lazy="true"
            :paginator="true"
            :rows="2"
            :totalRecords="item.totalElement"
            @row-click="onRowClick"
            @page="onPage"
        >
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

<style scoped>
    :deep(.p-datatable tbody tr:hover) {
        cursor: pointer;
    }
</style>