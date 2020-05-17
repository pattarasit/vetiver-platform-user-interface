<template>
  <div id="app">
    <router-view></router-view>

    <b-alert
      :show="this.$root.alertBox.popup.showAlert"
      dismissible
      fade
      :variant="this.$root.alertBox.popup.variant"
      class="position-fixed fixed-top pt-4 pb-3 text-center m-0 rounded-0"
      style="z-index: 2000"
    >
      <h4>{{this.$root.alertBox.popup.message}}</h4>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
</style>
