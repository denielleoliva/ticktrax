<template>
  <div class="topbar-container">
    <div style="margin-top: 0.5rem"><h1>What's That Tick?</h1></div>
    <div>
<!--      Menu:-->

      <q-btn class="myBtn" label="Start" @click="$emit('promptStartMenu')">

<!--        <q-menu>-->
<!--          <q-list style="min-width: 100px; padding: 10px">-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>Join a Game</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>New incognito tab</q-item-section>-->
<!--            </q-item>-->
<!--            <q-separator />-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>Recent tabs</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>History</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>Downloads</q-item-section>-->
<!--            </q-item>-->
<!--            <q-separator />-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>Settings</q-item-section>-->
<!--            </q-item>-->
<!--            <q-separator />-->
<!--            <q-item clickable v-close-popup>-->
<!--              <q-item-section>Help &amp; Feedback</q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->
<!--        </q-menu>-->
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 1,
    }
  },
  props: {
    generation: {
      type: Number,
      required: true,
    },
  },
  watch: {
    selected() {
      this.$emit('reset', parseInt(this.selected))
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/_main.scss";

.topbar-container {
  background: $topbar-blue-light;
  display: flex;
  align-items: center;
  height: 38px;
  overflow: hidden;
  @include breakpoint(max-width, 'tablet') {
    height: 44px;
  }
  & > div {
    color: #fff;
    position: relative;
    @include text-shadow($text);
    &:first-child {
      background: #5CAB7D;
      width: 45%;
      border: 0.4rem solid $topbar-blue-dark;
      border-bottom-right-radius: 10rem;
      border-top-right-radius: 10rem;
      border-left: none;
      padding: 0 1rem;
      z-index: 5;
      display: none;
      @include breakpoint(min-width, 'tablet') {
        display: block;
      }
    }
    &:last-child {
      width: 100%;
      z-index: 4;
      display: flex;
      justify-content: space-between;
      padding-left: 1rem;
      align-items: center;
      @include breakpoint(min-width, 'tablet') {
        width: 55%;
        font-size: 1.8rem;
        justify-content: flex-end;
      }
    }
  }
}
select {
  margin-left: 1rem;
  border: none;
  width: 15rem;
  height: 40px;
  background: $topbar-select;
  color: #fff;
  @include text-shadow($text);
  &:focus {
    outline: none;
    border: none;
  }
  option {
    border: none;
    outline: none;
    color: #fff;
  }
}
.myBtn {
  margin-left: 1rem;
  margin-top: 0.5rem;
  border: none;
  width: 15rem;
  background: #6bc1ce;
  color: #fff;
  text-shadow: 2px 2px 0 #494947;
}
</style>
