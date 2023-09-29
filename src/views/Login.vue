<template>
    <div>
      <h2>Login</h2>
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '/firebaseConfig';
  
  export default {
    name: 'LoginForm',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          console.log('User logged in successfully');
          router.push('/dashboard');
        } catch (error) {
          console.error('Error logging in:', error.message);
          errorMessage.value = error.message;
        }
      };
  
      return {
        email,
        password,
        login,
        errorMessage
      };
    }
  };
  </script>