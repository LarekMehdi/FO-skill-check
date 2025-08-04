<script lang="ts">
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import type { TakeTestInterface } from '../../../interfaces/test.interface';
import { TestService } from '../../../services/TestService';

    export default {
        data(): {
            item: TakeTestInterface,
            testId: number,
        } {
            return {
                testId: -1,
                item: {
                    id: -1,
                    title: '',
                    questionList: []
                },
            }
        },
        setup() {
            const { isLoggedIn } = useAuth();
            const toast = useToast();
            return {
                isLoggedIn,
                toast,
            }
        },
        mounted() {
            this.testId = Number(this.$route.params.id);
            this.initTakeTest();
        },
        methods: {
            async initTakeTest() {
                this.item = await TestService.findTestToTake(this.testId);
            }
        },
        components: {

        }
    }
</script>

<template>
    <h1>{{ item.title }}</h1>

</template>