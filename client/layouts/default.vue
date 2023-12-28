<template>
  <div>
    <headerVue/>

    <main>
      <slot />
    </main>
  </div>
</template>

<script>

import headerVue from '~/components/header.vue';

export default {
    name: "default",
    components: {
      headerVue
    }
}

</script>