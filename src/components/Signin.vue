<script lang="ts">
import useVuelidate from '@vuelidate/core';
import type { SigninDataInterface } from '../interfaces/auth.interface';
import { required } from '@vuelidate/validators';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../stores/auth.store';
import type { UserInterface } from '../interfaces/user.interface';


export default {
    setup() {
        const authStore = useAuthStore();
        return { 
            v$: useVuelidate(),
            authStore,
        };
    },
    validations() {
    return {
        signinData: {
            pseudo: { required },
            password: { required },
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
    components: {},
    computed: {},
    methods: {
        async signin() {
      this.v$.$touch();
      if (this.v$.$invalid) return;

      try {
        const res = await AuthService.signin(this.signinData);
        console.log('res => ', res);

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
                    <input 
                        v-model="signinData.pseudo"
                        type="text"
                        placeholder="Pseudo"
                        class="form-control"
                    />
                    <small v-if="v$.signinData.pseudo.$error" class="text-danger">
                        Le pseudo est requis.
                    </small>
                </section>
                
                <section class="mb-3">
                    <input 
                        v-model="signinData.password"
                        type="password"
                        placeholder="Mot de passe"
                        class="form-control"
                    />
                    <small v-if="v$.signinData.password.$error" class="text-danger">
                        Le mot de passe est requis.
                    </small>
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