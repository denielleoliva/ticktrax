import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    counter: 0,
    formState: [],
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
    setFormState(myForm) {
      this.formState = myForm;
    },
  },
});
