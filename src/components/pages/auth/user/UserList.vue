<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableRowClickEvent } from 'primevue';
import type { UserInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';
import type { GenericFilter, PageInterface } from '../../../../interfaces/filter.interface';
import { UtilEntity } from '../../../../utils/UtilEntity';
import InputSwitch from '../../../ui/InputSwitch.vue';
import { useToast } from 'vue-toastification';
import { Role } from '../../../../constants/role.constant';
import { useAuth } from '../../../../composables/useAuth';

    export default {
        setup() {
            const toast = useToast();
            const { userId } = useAuth(); 
            return {
                toast,
                userId,
            }
        },
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
            isRoleAdmin(role: string): boolean {
                return role === 'ADMIN';
            },
            isMyId(id: number) {
                return id === this.userId;
            },
            async updateRole(id: number, newValue: boolean) {
                try {
                    
                    const user: UserInterface | undefined = this.userList.find((u) => u.id === id);
                    if (!user) {
                        this.toast.error('Aucun utilisateurs trouvé avec cet id');
                        return;
                    }
                    const newRole: Role = newValue ? Role.ADMIN : Role.USER;
                    const userDto: Pick<UserInterface, 'id' | 'role'> = {id: user.id, role: newRole};
                    await UserService.changeUserRole(userDto);
                    this.toast.success('Role mis a jour');

                } catch(e: unknown) {
                    this.toast.error('Une erreur est survenue');

                } finally {
                    await this.initUserList();
                }
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
                        v-if="!isMyId(slotProps.data.id)"
                        :modelValue="isRoleAdmin(slotProps.data.role)"
                        name="isAdmin"
                        :displayLabel="false" 
                        :inline="true"
                        @update:model-value="(newValue: boolean) => updateRole(slotProps.data.id, newValue)"
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

