<template>
  <div class="register px-8 py-8">
    <router-link to="/login" class="w-fit"><img loading="lazy" src="../assets/arrow-left.svg" alt="back-to-login"></router-link>
    <div>
      <h1 class="text-4xl mb-8 font-semibold">Register to Stree</h1>
      <form class="w-full flex flex-col gap-8" @submit.prevent="handleClick">
        <input v-model.trim="user.fullName" required class="border-b outline-none w-full py-5" placeholder="Full Name" />
        <input v-model.trim="user.email" required class="border-b outline-none w-full py-5" type="email" placeholder="Email" />
        <input v-model.trim="user.phone" required class="border-b outline-none w-full py-5" type="tel" placeholder="Mobile Number" />
        <input v-model.trim="user.password" required class="border-b outline-none w-full py-4 mt-3" type="password" placeholder="Password" />

        <PasswordStrengthVue :password="user.password" />

        <input v-model.trim="user.confirmPassword" required class="border-b outline-none w-full py-4 mt-3" type="password" placeholder="Confirm Password" />

        <ButtonVue :disabled="!isFormValid" :title="'Register'" :type="'submit'" :customClass="'mt-4'" />

        <p class="w-full mt-2 text-center text-sm text-gray-400">
          By registering you agree to <span class="text-red-primary">Terms &amp; Conditions</span> and
          <span class="text-red-primary">Privacy Policy</span> of Stree
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonVue from "../components/Button.vue";
import { defineComponent } from "vue";
import PasswordStrengthVue from "../components/PasswordStrength.vue";
import { storeUsers, getUsers } from "../helper/auth"
import type { User } from "../helper/auth";

export default defineComponent({
  components: {
    ButtonVue,
    PasswordStrengthVue
  },
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        phone: null,
        password: "",
        confirmPassword: "",
      },
      users: [] as User[],
    };
  },
  mounted() {
    const users = getUsers();
    if (users) {
      this.users = users;
    }
  },
  computed: {
    isFormValid() {
      return (
        this.user.fullName.length > 0 &&
        this.isValidEmail(this.user.email) &&
        this.isValidPhoneNumber(this.user.phone) &&
        this.user.password.length >= 9 &&
        this.user.password === this.user.confirmPassword
      );
    },
  },
  methods: {
    isValidEmail(email:string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValidPhoneNumber(phone:any) {
      const phonePattern = /^\d{9,}$/;
      return phonePattern.test(phone);
    },
    handleClick() {
      const newUser = {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone,
        password: this.user.password,
      };

      this.users.push(newUser);

      this.saveUsersToLocalStorage();

      this.resetForm();

      this.$router.push({ path: '/login' })
      alert('Registration succesful')
    },
    saveUsersToLocalStorage() {
      storeUsers(this.users)
    },
    resetForm() {
      this.user.fullName = "";
      this.user.email = "";
      this.user.phone = null;
      this.user.password = "";
      this.user.confirmPassword = "";
    },
  },
});
</script>

<style>
.register {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
}
</style>
