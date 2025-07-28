<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { withMessage } from '../../utils/withMessage';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import type { SignupDataInterface } from '../../interfaces/auth.interface';
import InputText from '../ui/InputText.vue';
import InputPassword from '../ui/InputPassword.vue';
import ButtonSubmit from '../ui/ButtonSubmit.vue';
import { AuthService } from '../../services/AuthService';

const sameAsPassword = withMessage(
    'Les mots de passe ne correspondent pas',
    function (value: string, vm: any) {
        return value === vm.signupData.password;
    }
);

export default {
    setup() {
        return { 
            v$: useVuelidate(),
        };
    },
    validations() {
        return {
            signupData: {
                pseudo: { 
                    required: withMessage('Le pseudo est requis', required),
                    minLength: withMessage('Le pseudo doit faire au moins 2 charactères', minLength(2)),
                    maxLength: withMessage('Le pseudo doit faire moins de 50 charactères', maxLength(50)),
                },
                password: { 
                    required: withMessage('Le mot de passe est requis', required),
                    minLength: withMessage('Le mot de passe doit faire au moins 6 charactères', minLength(6)),
                },
                email: { 
                    required: withMessage("L'adresse email est requise", required),
                    email: withMessage("L'adresse email n'est pas valide", email)
                },
            },
            repeatPassword: {
                required: withMessage('La répétition du mot de passe est requise', required),
                sameAsPassword,
            }
        };
    },
    mounted() { },
    data(): {signupData: SignupDataInterface, repeatPassword: string}
    {
        return {
            signupData: { pseudo: '', password: '', email: ''},
            repeatPassword: '',
        }
    },
    components: {
        InputText,
        InputPassword,
        ButtonSubmit
    },
    computed: {
        
    },
    methods: {
        async signup() {
            this.v$.$touch();
            if (this.v$.$invalid) return;

            try {
                await AuthService.signup(this.signupData);
                this.$router.push('/signin');
            } catch (e: any) {
                console.log(e);
                // toastify? flashbag?
               
            }
        }
    }
}

</script>

<template>
    <main>
        <h1>Créer un compte</h1>

        <div>
            <form @submit.prevent="signup">
                <section class="mb-3">
                    <InputText
                        v-model="signupData.pseudo"
                        name="pseudo"
                        placeholder="Pseudo"
                        :displayLabel="false"
                        :validation="v$.signupData.pseudo"
                    />
                </section>

                <section class="mb-3">
                    <InputText
                        v-model="signupData.email"
                        name="email"
                        placeholder="Email"
                        label="Email"
                        :displayLabel="false"
                        :validation="v$.signupData.email"
                    />
                </section>
                
                <section class="mb-3">
                    <InputPassword
                        v-model="signupData.password"
                        name="password"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        :displayLabel="false"
                        :validation="v$.signupData.password"
                    />
                </section>

                <section class="mb-3">
                    <InputPassword
                        v-model="repeatPassword"
                        name="password"
                        placeholder="Répéter le mot de passe"
                        label="Répéter le mot de passe"
                        :displayLabel="false"
                        :validation="v$.repeatPassword"
                    />
                </section>

                <ButtonSubmit content="Créer un compte"/>
                
            </form>
        </div>
    </main>
</template>