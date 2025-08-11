<script lang="ts">
import { useAuth } from '../../../../composables/useAuth';
import { Role } from '../../../../constants/role.constant';
import type { UserDetailsInterface } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/UserService';

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
                    role: Role.USER
                }
            }
        },
        methods: {
            async initUserDetails() {
                this.item = await UserService.findDetails(this.idParam);
                console.log(this.item);
            }
        },
        computed: {
            isMyId() {
                return Number(this.userId) === this.idParam;
            },
            displayTitle() {
                return this.isMyId ? 'Mon profil' : `Profil de ${this.item.pseudo}`;
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
            
        },
    }
</script>

<template>
    <h1>{{  displayTitle }}</h1>
</template>