<script lang="ts">
import useVuelidate from '@vuelidate/core';

import { required } from '@vuelidate/validators';
import InputText from '../../ui/InputText.vue';
import InputPassword from '../../ui/InputPassword.vue';
import ButtonSubmit from '../../ui/ButtonSubmit.vue';
import { useToast } from 'vue-toastification';
import { useAuth } from '../../../composables/useAuth';
import { withMessage } from '../../../utils/withMessage';
import type { SigninDataInterface } from '../../../interfaces/auth.interface';
import { AuthService } from '../../../services/AuthService';
import type { UserInterface } from '../../../interfaces/user.interface';


export default {
    setup() {
        const { authStore } = useAuth();
        const toast = useToast();
        return { 
            v$: useVuelidate(),
            authStore,
            toast,
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
        InputPassword,
        ButtonSubmit
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
                    this.toast.error("Identifiants incorrectes");
                } else {
                    this.toast.error("Une erreur est survenue");
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
                        :displayLabel="false"
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

                <ButtonSubmit content="Connexion"/>
                
            </form>
        </div>
    </main>
</template>