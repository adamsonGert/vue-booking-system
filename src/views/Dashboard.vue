<template>
    <section class="container mx-auto py-10 px-4">
        <div class="flex flex-col text-left items-center justify-center min-h-screen">
            <h1 class="text-5xl">Welcome <strong aria-live="polite">{{ userName }}</strong></h1>
            <div class="flex space-x-4 pt-8 pb-8">
                <button @click="activeView = 'form'" class="font-semibold py-2 px-4 rounded" :class="{'bg-blue-600 text-white hover:bg-blue-800': activeView === 'form', 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100': activeView !== 'form' }">Create Booking</button>
                <button @click="activeView = 'bookings'" class="font-semibold py-2 px-4 rounded" :class="{'bg-blue-600 text-white hover:bg-blue-800': activeView === 'bookings', 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100': activeView !== 'bookings' }">View Bookings</button>
            </div>
            <BookingForm v-if="activeView === 'form'" />
            <Bookings v-if="activeView === 'bookings'" />
            <button @click="logout" class="mt-8 text-gray-400 hover:underline hover:text-gray-100 hover:cursor-pointer">
                Log Out
            </button>
        </div>
    </section>
</template>

<script>
import titleAndDescription from '../composables/titleAndDescription';
import BookingForm from '../components/BookingForm.vue';
import Bookings from '../components/Bookings.vue';
import router from '@/router';
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';

export default {
    name: 'DashboardView',
    setup() {
        const { title, description } = titleAndDescription();
        const userName = ref('');
        const activeView = ref('');
        const auth = getAuth();

        title.value = 'Dashboard | Bookify';
        description.value = 'Bookify platform';

        if (auth.currentUser) {
            userName.value = auth.currentUser.displayName;
        }

        const logout = async () => {
            try {
                await signOut(auth);
                router.push('/');
            } catch (error) {
                console.error("Error logging out: ", error);
            }
        };

        return {
            userName,
            activeView,
            logout
        };
    },
    components: {
    BookingForm,
    Bookings
  }
}
</script>