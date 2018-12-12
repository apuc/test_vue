<template>

  <div class="control-wrap">
    <button class="control-span"
            v-if="!isInputActive"
            @click="swithInputState"
    >
      {{makeSpaces}}
    </button>

    <div class="input-wrap" v-show="isInputActive">
      <input type="text"
             v-model="inputValue"
             @input="deleteNonNumber($event.target.value)"
             @keyup.esc="swithInputState"
             @keyup.enter="hideInputAndSave"
      >

      <button type="button"
              class="helper"
              v-if="helper"
              @click="setHelperValue"
      >
        {{helper.title + index}}
      </button>

      <button type="button" class="increment" @click="increment"></button>

      <button type="button" class="decrement" @click="decrement"></button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "ContolInput",
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      helper: {
        type: Object,
        required: false
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isInputActive: false,
        inputValue: 0,
      }
    },
    computed: {
      makeString() {
        return String(this.value);
      },
      makeSpaces() {
        return this.makeString.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    },
    methods: {
      ...mapMutations({
        changeControlState: 'CHANGE_CONTROL_STATE',
      }),
      swithInputState(e) {
        this.isInputActive = !this.isInputActive;
        this.inputValue = this.value;
        // this.$refs.inputController.select();
        // this.$refs.inputController.focus();
      },
      deleteNonNumber(value) {
        this.inputValue = value.replace(/[^0-9.]/g,'');
      },
      hideInputAndSave() {
        this.changeControlState({
          value: this.inputValue,
          index
        });
        this.isInputActive = !this.isInputActive;
      },
      increment() {
        this.inputValue++
      },
      decrement() {
        if (this.inputValue > 0) {
          this.inputValue--
        }
      },
      setHelperValue() {
        this.inputValue = this.helper.value;
      }
    },
  }
</script>

<style scoped>
  .control-wrap {
    display: flex;
    align-items: center;
  }

  .control-span {
    position: relative;
    z-index: 1;

    padding: 5px 10px;

    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  .control-span::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;

    display: block;
    width: 5px;
    height: 5px;

    transform: translateY(-50%) rotate(-45deg);
    border: 1px solid;
    border-top: none;
    border-right: none;
  }

  .input-wrap {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .increment,
  .decrement {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    padding: 3px;

    line-height: 1;
  }

  .increment::before,
  .decrement::before {
    content: '';
    position: absolute;
    left: 0;


    display: block;
    width: 5px;
    height: 5px;

    transform: translateY(-50%) rotate(-45deg);
    border: 1px solid;
    border-top: none;
    border-right: none;
  }

  .increment::before {
    border: 1px solid;
    border-bottom: none;
    border-left: none;
  }

  .decrement {
    top: 10px;
  }

  .helper {
    padding: 0;

    font-size: 12px;
    color: #65b5f5;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>