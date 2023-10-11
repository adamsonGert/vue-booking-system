<template>
    <section class="min-h-screen flex items-stretch text-white">
      <SignHero />
      <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" :style="{ backgroundImage: `url(${heroImage})` }">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div class="w-full py-6 z-20">
          <h1 class="text-5xl my-6 font-bold">Lost password</h1>
          <div class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            <div class="pb-2 pt-4">
                  <label class="block text-left mb-1" for="email">Email</label>
                  <input id="email" v-model="email" placeholder="Email you registered account with" aria-label="Email" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
              </div>
              <div class="pb-2 pt-4">
                  <button @click="retrieve" aria-label="Retrieve button" class="block w-full font-bold p-3 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none">Submit</button>
              </div>
              <router-link to="/" class="text-gray-400 block pt-2 hover:underline" aria-label="Login">Back to Sign in</router-link>
              <span v-info="infoMessage" class="pt-2 block text-white p-4" role="alert">
                {{infoMessage}}
              </span>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import titleAndDescription from '../composables/titleAndDescription';
import SignHero from '../components/SignHero.vue';
import heroImage from '../assets/hero-bg.webp';
import { ref } from 'vue';
import { auth } from '/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
    name: 'ForgotPassword',

    setup() {
      const { title, description } = titleAndDescription();
      const email = ref();
      const infoMessage = ref('');

      title.value = 'Forgot password | Bookify';
      description.value = 'Retrieve a new password using your email';
      
      const retrieve = async() => {
        try {
          await sendPasswordResetEmail(auth, email.value);
          infoMessage.value = "Password reset email sent! Check your inbox.";
        } catch (error) {
          infoMessage.value = error.message.replace("Firebase: ", "");
        }
      };

      return {
        email,
        retrieve,
        infoMessage,
        heroImage
      };
    },
    components: {
        SignHero
  }
}

</script>