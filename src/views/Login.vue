<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{
                        invalid:
                            (v$.email.$dirty && !v$.email.required.$response) ||
                            (v$.email.$dirty && !v$.email.email.$response)
                    }"
                />
                <label for="email">Email</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.email.$dirty && !v$.email.required.$response"
                    >Поле Email не должно быть пустым</small
                >
                <small
                    class="helper-text invalid"
                    v-if="v$.email.$dirty && !v$.email.email.$response"
                    >Email введен неккоректно</small
                >
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{
                        invalid:
                            (v$.password.$dirty &&
                                !v$.password.required.$response) ||
                            (v$.password.$dirty &&
                                !v$.password.minLength.$response)
                    }"
                />
                <label for="password">Пароль</label>
                <small
                    class="helper-text invalid"
                    v-if="v$.password.$dirty && !v$.password.required.$response"
                    >Поле Password не должно быть пустым</small
                >
                <small
                    class="helper-text invalid"
                    v-if="
                        v$.password.$dirty && !v$.password.minLength.$response
                    "
                    >Password должен содержать как минимум
                    {{ v$.password.minLength.$params.min }} символов</small
                >
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import { required, email, minLength } from "@vuelidate/validators"
import messages from "@/utils/messages"
export default {
    // setup: () => ({  }),
    name: "login",
    data: () => ({
        v$: useVuelidate(),
        email: "",
        password: ""
    }),
    mounted() {
        if (messages[this.$route.query.message]) {
            M.toast({ html: messages[this.$route.query.message] })
        }
    },
    methods: {
        async submitHandler() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const formData = {
                    email: this.email,
                    password: this.password
                }
                try {
                    await this.$store.dispatch("login", formData)
                    this.$router.push("/")
                } catch (error) {}
            }
        }
    },
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(6) }
    }
}
</script>
