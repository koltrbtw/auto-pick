<template>

<main>
        <section>
            <h1>Авторизация</h1>
            <p></p>

            <article :class="{ error: 'login' == errorField }">
                <p>Логин от вашего аккаунта</p>
                <input v-model="login" type="text" placeholder="Логин">
                <section>
                    <img src="/icons/error.svg"/>
                    <p>{{errorMessage}}</p>
                </section>
            </article>

            <article :class="{ error: 'password' == errorField }">   
                <p>Пароль от вашего аккаунта</p>
                <input v-model="password" type="password" placeholder="Пароль">
                <section>
                    <img src="/icons/error.svg"/>
                    <p>{{errorMessage}}</p>
                </section>
            </article>

            <button v-if="!waitResponse" @click="trySignIn()" class="auth">
                Войти в аккаунт
            </button>

            <button v-else class="auth">
                <img src="/icons/animations/loading.svg"/>
            </button>

            <button class="reg" @click="navigate('/signup')">
                Нет аккаунта?
            </button>

        </section>
    </main>

</template>

<script>

definePageMeta({
  layout: 'noHeader',
  middleware: [
    "in-account"
  ]
})

export default {
    data() {
        return {
            waitResponse: false,

            login: "",
            password: "",

            errorField: "",
            errorMessage: "Тестовое уведомление"
        }
    },

    methods: {
        trySignIn: async function() {
            if (this.waitResponse)
                return;

            this.waitResponse = true;
            
            const result = await $fetch('api/auth/trysignin', {
                method: 'POST',
                body: {
                    login: this.login,
                    password: this.password
                }
            });

            this.waitResponse = false;

            if (result.status == "error")
            {
                this.callError(result.field, result.data)
                return;
            }

            const authToken = useCookie("authToken");
            authToken.value = result.data;

            await navigateTo("/")
        },

        callError: function(field, message) {
            this.errorField = field;
            this.errorMessage = message;
        },


        navigate: async function (path) {
            await navigateTo(path)
        }
    }
}

</script>

<style scoped>

@import url("~/assets/css/authication.css");

</style>