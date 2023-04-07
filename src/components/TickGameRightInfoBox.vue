

<template>
  <div>
    <div class="container">
      <ul>
        <li>
          <h3>Comm. Name</h3>
          <div>
            <span v-if="showInfo">{{answer.commonName}}</span>
            <span v-else>&nbsp;</span>
          </div>
        </li>
        <li>
          <h3>Sci. Name</h3>
          <div>
            <span v-if="showInfo">{{ answer.scientificName }}</span>
            <span v-else>&nbsp;</span>
          </div>
        </li>
        <li>
          <h3>Family</h3>
          <div>
            <div
              class="types"
              v-for="(type, index) in answer.type"
              :key="index"
            >
              <span v-if="showInfo" class="water">{{ type }}</span>
              <span v-else>&nbsp;</span>
            </div>
          </div>
        </li>
        <li class="li-columns">
          <h3 style="width: 100%">Disease transmission</h3>
          <div class="abilities">
            <div v-for="(ability, index) in answer.abilities" :key="index">
              <span v-if="showInfo">{{ ability }}</span>
<!--              <span v-else>&nbsp;</span>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      type: Object,
      required: true,
    },
    showInfo: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/components/_titles_and_text.scss';

h3 {
  top: 5px;
  width: 270px
}
span {
  margin-top: 5px;
}

div.abilities > div > span {
  background: #fef3ef;
  border-radius: 0.3rem;
  font-size: 1.4rem;
  padding: 0.3rem 0.7rem;

}
</style>
