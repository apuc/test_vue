<template>
  <div class="home">
    <ContolInput v-for="(control, index) in controls"
                 :key="control.title + index"
                 :index="index"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContolInput from "./ContolInput";

export default {
  name: 'home',
  components: {ContolInput},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      controls: 'controls',
    })
  },
  methods: {
  },

}
</script>

<style scoped>
</style>