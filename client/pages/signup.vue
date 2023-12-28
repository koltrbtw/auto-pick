<template>

    <main>
        <section>
            <h1>Регистрация</h1>
            <p></p>

            <article :class="{ error: 'login' == errorField }">
                <p>Логин от нового аккаунта</p>
                <input v-model="login" type="text" placeholder="Логин">
                <section>
                    <img src="/icons/error.svg"/>
                    <p>{{errorMessage}}</p>
                </section>
            </article>

            <article :class="{ error: 'password' == errorField }">
                <p>Пароль от нового аккаунта</p>
                <input v-model="password" type="password" placeholder="Пароль">
                <section>
                    <img src="/icons/error.svg"/>
                    <p>{{errorMessage}}</p>
                </section>
            </article>

            <article :class="{ error: 'repeatedPassword' == errorField }">
                <p>Повторите пароль от нового аккаунта</p>
                <input v-model="repeatedPassword" type="password" placeholder="Пароль">
                <section>
                    <img src="/icons/error.svg"/>
                    <p>{{errorMessage}}</p>
                </section>
            </article>

            <button class="auth" @click="trySignUp">
                Создать аккаунт
            </button>

            <button class="reg" @click="navigate('/signin')">
                Есть аккаунт?
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
            repeatedPassword: "",

            errorField: "",
            errorMessage: "Тестовое уведомление"
        }
    },

    methods: {
        trySignUp: async function() {
            if (this.repeatedPassword != this.password)
            {
                this.callError("repeatedPassword", "Пароль не совпадает")
                return;
            }

            const result = await $fetch('api/auth/trysignup', {
                method: 'POST',
                body: {
                    login: this.login,
                    password: this.password
                }
            });

            console.log(result);

            if (result.status == "error")
            {
                this.callError(result.field, result.data)
                return;
            }

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