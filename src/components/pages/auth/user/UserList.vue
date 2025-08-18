<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import type { UserInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';
import type { GenericFilter, PageInterface } from '../../../../interfaces/filter.interface';
import { UtilEntity } from '../../../../utils/UtilEntity';
import InputSwitch from '../../../ui/InputSwitch.vue';

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
                    limit: 10,
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
                this.goToUserDetails(event.data.id);
            },
            goToUserDetails(id: number) {
                this.$router.push(`/user/${id}`)
            },
            onPage(event: DataTablePageEvent) {
                this.filter = UtilEntity.updateFilterOnPage(event, this.filter);
                this.initUserList();
            },
            updateRole(id: number) {
                console.log(id);
            },
        },
        components: {
            DataTable,
            Column,
            InputSwitch,
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
            :rows="10"
            :totalRecords="item.totalElement"
            @page="onPage"
        >
            <template #empty>Aucun utilisateurs à afficher</template>
            <Column header="Id" field="id" sortable style="width: 10%;">
                <template #body="slotProps" >
                    <span @click="goToUserDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.id }}
                    </span>
                    
                </template>
            </Column>
            <Column header="Pseudo" field="pseudo" sortable style="width: 40%;">
                <template #body="slotProps">
                    <span @click="goToUserDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.pseudo }}
                    </span>
                </template>
            </Column>
            <Column header="Email" field="email" sortable style="width: 40%;">
                <template #body="slotProps">
                    <span @click="goToUserDetails(slotProps.data.id)" class="clickable">
                        {{  slotProps.data.email }}
                    </span>
                </template>
            </Column>
            <Column header="Role" field="role" sortable style="width: 10%;">
                <template #body="slotProps">
                    {{  slotProps.data.role }}
                    <InputSwitch
                        :modelValue="slotProps.data.role === 'ADMIN'"
                        name="isAdmin"
                        :displayLabel="false" 
                        :inline="true"
                        @update:model-value="updateRole(slotProps.data.id)"
                    />
                </template>
            </Column>
        </DataTable>
    </section>
</template>

<style>
    .clickable {
        cursor: pointer;
    }
</style>

