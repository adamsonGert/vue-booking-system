<template>
  <section class="min-h-screen flex items-stretch text-white ">
      <SignHero />
      <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div class="w-full py-6 z-20">
          <h1 class="text-5xl my-6 font-bold">Sign up</h1>
          <form @submit.prevent="register" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            <div class="pb-2 pt-4">
                  <label class="block text-left mb-1" for="name">Name</label>
                  <input id="name" v-model="name" placeholder="Name is optional" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
              </div>
              <div class="pb-2 pt-4">
                  <label class="block text-left mb-1" for="email">Email</label>
                  <input id="email" v-model="email" placeholder="Email" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
              </div>
              <div class="pb-2 pt-4">
                  <label class="block text-left mb-1" for="password">Password</label>
                  <input v-model="password" type="password" placeholder="Must have atleast 6 characters" class="block w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 p-4 text-lg rounded-sm bg-black">
              </div>
              <div class="pb-2 pt-4">
                  <button @click="register" aria-label="Register button" class="block w-full font-bold p-3 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none">Sign Up</button>
              </div>
              <div class="pt-4">
                <router-link to="/" class="text-gray-400" aria-label="Login">Or if you already have an account then <span class="hover:underline hover:text-gray-100">Sign in</span></router-link>
                <p aria-live="polite" class="text-sm text-red-500 pt-4" v-if="errorMessage">{{ errorMessage }}</p>
              </div>
            </form>
        </div>
      </div>
  </section>
</template>
  
<script>
import titleAndDescription from '../composables/titleAndDescription';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '/firebaseConfig';
import SignHero from '../components/SignHero.vue';

export default {
  name: 'RegisterForm',
  setup() {
    const { title, description } = titleAndDescription();
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    title.value = 'Register | Bookify';
    description.value = 'Register your account to access the Bookify platform';

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        
        await updateProfile(user, {
          displayName: name.value
        });

        router.push('/dashboard');
      } catch (error) {
        errorMessage.value = error.message.replace("Firebase: ", "");
      }
    };

    return {
      name,
      email,
      password,
      register,
      errorMessage
    };
  },
  components: {
    SignHero
  }
};

</script>