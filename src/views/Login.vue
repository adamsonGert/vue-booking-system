<template>
  <section class="min-h-screen flex items-stretch text-white ">
      <SignHero />
      <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" :style="{ backgroundImage: `url(${heroImage})` }">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div class="w-full py-6 z-20">
          <h1 class="text-5xl my-6 font-bold">
              Sign in
          </h1>
          <form @submit.prevent="login" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            <div class="pb-2 pt-4">
                <label class="block text-left mb-1" for="email">Email</label>
                <input id="email" v-model="email" placeholder="john.doe@gmail.com" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
            </div>
            <div class="pb-2 pt-4">
                <label class="block text-left mb-1" for="password">Password</label>
                <input id="password" v-model="password" type="password" placeholder="Must have atleast 6 characters" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
            </div>
            <div class="text-right text-gray-400 hover:underline hover:text-gray-100">
                <router-link to="/forgot-password" aria-label="Forgot password" class="text-gray-400">Forgot your password?</router-link>
            </div>
            <div class="pt-4 pb-4">
                <button type="submit" class="block w-full font-bold p-3 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none">Sign In</button>
            </div>
            <router-link to="/register" class="text-gray-400">Or if you don't have an account then <span class="hover:underline hover:text-gray-100">Sign up</span></router-link>
            <p class="text-sm text-red-500 pt-4" aria-live="polite" v-if="errorMessage">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
  </section>
</template>
  
<script>
  import titleAndDescription from '../composables/titleAndDescription';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '/firebaseConfig';
  import SignHero from '../components/SignHero.vue';
  import heroImage from '../assets/hero-bg.webp';
  
  export default {
    name: 'LoginForm',
    setup() {
      const { title, description } = titleAndDescription();
      const router = useRouter();
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');

      title.value = 'Login | Bookify';
      description.value = 'Login to access the Bookify platform';
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/dashboard');
        } catch (error) {
          errorMessage.value = error.message.replace("Firebase: ", "");
        }
      };
  
      return {
        email,
        password,
        login,
        errorMessage,
        heroImage
      };
    },
      components: {
      SignHero
    }
  };
  </script>