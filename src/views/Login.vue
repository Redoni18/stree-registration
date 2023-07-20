<template>
  <div class="login">
    <img src="../assets/logo.svg" alt="">
    <form class="w-full px-8" @submit.prevent="handleClick">
        <input v-model.trim="user.email" required type="email" class="border-b outline-none w-full py-4" placeholder="Email" />
        <input v-model.trim="user.password" required type="password" class="border-b outline-none w-full py-4 mt-6" placeholder="Password" />
        <p class="text-red-primary mt-4 text-end text-sm font-medium">Forgot Passord?</p>

        <p v-if="errorMessage" class="text-red-primary text-center mt-4">{{errorMessage}}</p>
        <ButtonVue :disabled="!isFormValid" :title="'Login'" :type="'submit'" />
        <p class="w-full mt-8 text-center text-sm text-gray-400">Don't have an account? <router-link to="/register" class="text-red-primary">Register now</router-link></p>
    </form>
  </div>
</template>

<script lang="ts">
import ButtonVue from '../components/Button.vue';
import { storeLoggedInUser, getUsers, User } from "../helper/auth"
export default {
  components: { ButtonVue },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      allUsers: [] as User[],
      errorMessage: ''
    };
  },
  computed: {
    isFormValid() {
      return this.user.email && this.isValidEmail(this.user.email) && this.user.password.length >= 9;
    },
  },
  mounted() {
    this.allUsers = getUsers()
  },
  methods: {
    isValidEmail(email: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    handleClick() {
      const activeUser = this.allUsers.filter(
        (user) => user.email === this.user.email && user.password === this.user.password
      );

      
      if(!activeUser.length) {
        setTimeout(() => {
          this.errorMessage = ''
        }, 5000)

        this.errorMessage = "Incorrect email or password"
        return 
      }

      storeLoggedInUser(this.user)
      this.$router.push({ path: '/' })
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
