<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ title }}</p>

    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <q-btn color="black" label="Black" @click="something" />
    <q-btn color="black" label="Remove" @click="remove" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
const msg = ref<string>('HEllo');
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}
function something() {
  msg.value = 'New HEllo' + ' ' + msg.value;
  console.log(props.todos);
}
function remove() {
  msg.value = '';
}

const todoCount = computed(() => props.todos.length);
</script>
