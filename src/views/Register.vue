<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-5">Register</h2>
    <input 
      v-model="email" 
      placeholder="Email" 
      class="mb-4 p-2 w-64 border- rounded border shadow focus:outline-none focus:border-blue-500"
    />
    <input 
      type="password" 
      v-model="password" 
      placeholder="Password" 
      class="mb-4 p-2 w-64 rounded border shadow focus:outline-none focus:border-blue-500"
    />
    <button 
      @click="register" 
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Register
    </button>
  </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '/firebaseConfig';

export default {
  name: 'RegisterForm',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log('User registered successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    };

    return {
      email,
      password,
      register
    };
  }
};

</script>