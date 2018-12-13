<template>
  <div class="home">
    <h1 class="title">Три взаимодействующих контрола</h1>

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
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    max-width: 300px;
    font-size: 24px;
    font-weight: normal;
  }
</style>