<template>

    <p>Index.vue</p>

</template>

<script>

definePageMeta({
  layout: 'default',
//   middleware: [
//     'auth'
//   ]
})

export default {

    mounted() {
        
    },

    methods: {
        getFuelTypes: async function() {
            const result = await $fetch('api/get/fueltypes');
            console.log(result);
        }
    }
}


</script>