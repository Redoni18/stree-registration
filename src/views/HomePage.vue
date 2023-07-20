<template>
  <div class="homepage">
    <div>
      <h1 class="font-semibold text-3xl">You are now Home</h1>
      <p class="mt-4">All you can do here is get out</p>
    </div>

    <ButtonVue :disabled="false" :title="'Logout'" :type="'button'" @onClick="handleClick" :customClass="'homepage-button'" />
  </div>
</template>


<script lang="ts">
import ButtonVue from "../components/Button.vue";
import { defineComponent } from "vue"
import { removeLoggedInUser } from "../helper/auth"
export default defineComponent ({
  components: {ButtonVue},
  methods: {
    handleClick() {
      this.$router.push({ path: '/login'})
      removeLoggedInUser()
    }
  }
})
</script>

<style scoped>
.homepage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  gap: 10%;
}

.homepage-button {
  width: 70%
}
</style>

