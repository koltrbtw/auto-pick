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

            <article class="checkbox">
                <input type="checkbox">
                <p>Не выходить</p>
            </article>

            <button @click="trySignIn()" class="auth">
                Войти в аккаунт
            </button>

            <button class="reg" @click="navigate('/signup')">
                Нет аккаунта?
            </button>

        </section>
    </main>

</template>

<script>

definePageMeta({
  layout: 'noHeader'
})

export default {
    data() {
        return {
            login: "",
            password: "",

            errorField: "",
            errorMessage: "Тестовое уведомление"
        }
    },

    methods: {
        trySignIn: async function() {
            const result = await $fetch('api/auth/trysignin', {
                method: 'POST',
                body: {
                    login: this.login,
                    password: this.password
                }
            });

            if (result.status == "error")
            {
                this.callError(result.field, result.data)
                return;
            }

            console.log(result);

            const authToken = useCookie("authToken");
            authToken.value = result.data;

            await this.navigate("/");
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