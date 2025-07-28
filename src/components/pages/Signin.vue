<script lang="ts">
import useVuelidate from '@vuelidate/core';
import type { SigninDataInterface } from '../../interfaces/auth.interface';
import { required } from '@vuelidate/validators';
import { AuthService } from '../../services/AuthService';
import type { UserInterface } from '../../interfaces/user.interface';
import { useAuth } from '../../composables/useAuth';
import InputText from '../ui/InputText.vue';
import { withMessage } from '../../utils/withMessage';
import InputPassword from '../ui/InputPassword.vue';


export default {
    setup() {
        const { authStore } = useAuth();
        return { 
            v$: useVuelidate(),
            authStore,
        };
    },
    validations() {
        return {
            signinData: {
                pseudo: { required: withMessage('Le pseudo est requis', required) },
                password: { required: withMessage('Le mot de passe est requis.', required) },
            },
        };
    },
    mounted() { },
    data(): {signinData: SigninDataInterface}
    {
        return {
            signinData: { pseudo: '', password: ''}
        }
    },
    components: {
        InputText,
        InputPassword
    },
    computed: {},
    methods: {
        async signin() {
            this.v$.$touch();
            if (this.v$.$invalid) return;

            try {
                const res = await AuthService.signin(this.signinData);

                const user: UserInterface = {
                    id: res.id,
                    pseudo: res.pseudo,
                    role: res.role,
                };

                this.authStore.setAuthState({
                    accessToken: res.accessToken,
                    refreshToken: '',
                    user: user,
                });

                this.$router.push('/');
                
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    // toastify? flashbag?
                }
            }
        },
    }
}

</script>

<template>
    <main>
        <h1>Se connecter</h1>
        <div>
            <form @submit.prevent="signin">
                <section class="mb-3">
                    <InputText
                        v-model="signinData.pseudo"
                        name="pseudo"
                        placeholder="Pseudo"
                        :validation="v$.signinData.pseudo"
                    />
                </section>
                
                <section class="mb-3">
                    <InputPassword
                        v-model="signinData.password"
                        name="password"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        :displayLabel="false"
                        :validation="v$.signinData.password"
                    />
                </section>
                
                <button
                    type="submit" 
                    class="btn btn-primary btn-block"
                >
                    Connexion
                </button>
            </form>
        </div>
    </main>
</template>