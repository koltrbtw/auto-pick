<template>
    <header>
        <section class="logotype">
            <img src="/icons/logo.svg"/>
            <h1>Auto pick</h1>
        </section>

        <nav>
            <button class="active">
                Каталог
            </button>

            <button>
                О компании
            </button>

            <button>
                Контакты
            </button>
        </nav>

        <section class="profile">
            <button @click="logOut" class="outline">
                Выйти
            </button>
        </section>
    </header>
</template>

<script>

export default {
    name: "header",

    data() {

    },

    methods: {
        logOut: async function() {
            const authToken = useCookie("authToken");
            authToken.value = undefined;

            await navigateTo("/signin");
        },
    },
}

</script>

<style scoped>

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

header .logotype {
    display: flex;
    justify-content: center;
    align-items: center;
}

header .logotype img {
    margin-right: 1rem;
}

header nav {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header button {
    color: black;
    font-family: var(--main-font) !important;
    padding: 0.5rem 2rem;
    background: none;

    transition: background-color 0.25s, color 0.25s;
    border: none;
    border-radius: 10rem;

    cursor: pointer;
    width: fit-content;
}

header button.active, header button:hover  {
    color: white;
    background-color: var(--main-color);
}

</style>