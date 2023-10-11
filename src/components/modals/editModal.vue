<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 w-full h-full z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center" @click="closeOnOutsideClick">
            <div class="container max-w-lg px-4">
                <form class="modal p-5 rounded-lg shadow-lg relative z-10" @submit.prevent="updateBooking" style="background: #11262f;">
                    <label for="datepicker" class="block text-white  text-sm font-medium mb-2">Date</label>
                    <VueDatePicker placeholder="Pick a date" v-model="localDateValue" @change="localDateValue = $event" :disabled-week-days="[6, 0]" required class="w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 placeholder-gray-900 hover:cursor-pointer"></VueDatePicker>

                    <label for="bookingTopic" class="block text-white text-sm font-medium mt-5 mb-3">Topic</label>
                    <select id="bookingTopic" required v-model="localTopicValue" class="text-gray-900 placeholder-gray-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 py-2 pl-2 block w-full border-gray-200 rounded-sm text-sm">
                        <option selected>- Topic -</option>
                        <option value="Consultation">Consultation</option>
                        <option value="UX & UI">UX & UI</option>
                        <option value="Front-end">Front-end</option>
                        <option value="Design">Design</option>
                        <option value="Other">Other</option>
                    </select>

                    <label for="location" class="block text-white text-sm font-medium mt-5 mb-3">Location</label>
                    <div class="flex space-x-4">
                    <div class="flex items-center">
                        <input v-model="localLocationValue" required id="office" type="radio" name="location" value="Office" class="h-4 w-4 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer" aria-labelledby="office-option" aria-describedby="office-option">
                        <label for="office" class="text-md text-white font-medium ml-2 hover:cursor-pointer">Office</label>
                    </div>

                    <div class="flex items-center">
                        <input v-model="localLocationValue" required id="zoom" type="radio" name="location" value="Zoom call" class="h-4 w-4 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer" aria-labelledby="zoom-option" aria-describedby="zoom-option">
                        <label for="zoom" class="text-md text-white font-medium ml-2 hover:cursor-pointer">Zoom call</label>
                    </div>

                    <div class="flex items-center">
                        <input v-model="localLocationValue" required id="meet" type="radio" name="location" value="Google meet" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer" aria-labelledby="google-meet-option" aria-describedby="google-meet-option">
                        <label for="meet" class="text-md text-white font-medium ml-2 hover:cursor-pointer">Google meet</label>
                    </div>
                    </div>
                    
                    <label for="comment" class="block text-white text-sm font-medium mt-5 mb-3">Comments</label>
                    <textarea id="comment"
                        v-model="localCommentsValue" 
                        placeholder="Please provide any additional details that will help us prepare for your appointment"
                        class="my-2 p-4 w-full h-32 text-gray-900 placeholder-gray-500 rounded-sm"
                    ></textarea>

                    <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update Booking
                    </button>
                    <button @click="$emit('close')" class="mt-4 text-white hover:opacity-50 font-bold pl-5">Close</button>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, watch, nextTick } from 'vue';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { auth } from '/firebaseConfig';

export default {
    name: 'editModal',
    components: { VueDatePicker },
    props: {
        open: Boolean,
        booking: Object
    },
    emits: ['close', 'booking-updated'],
    setup(props, { emit }) {
        const localDateValue = ref(null);
        const localTopicValue = ref(null);
        const localLocationValue = ref(null);
        const localCommentsValue = ref(null);

        watch(() => props.booking, async (newBooking) => {
            if (newBooking) {
                await nextTick();
                localDateValue.value = newBooking.date.toDate();
                localTopicValue.value = newBooking.topic;
                localLocationValue.value = newBooking.location;
                localCommentsValue.value = newBooking.comments;
            }
        }, { immediate: true, deep: true });

        const updateBooking = async () => {
            try {
                const db = getFirestore();
                const bookingRef = doc(db, `users/${auth.currentUser.uid}/bookings`, props.booking.id);
                await updateDoc(bookingRef, {
                    date: localDateValue.value,
                    topic: localTopicValue.value,
                    location: localLocationValue.value,
                    comments: localCommentsValue.value
            });

            emit('booking-updated', props.booking.id);
            
            localDateValue.value = null;
            localTopicValue.value = null;
            localLocationValue.value = null;
            localCommentsValue.value = null;
            
            emit('close');
            
            } catch (error) {
                console.error("Error updating booking:", error);
            }
        };

        const closeOnOutsideClick = (event) => {
            if (event.target.classList.contains('bg-opacity-50')) {
                emit('close');
            }
        }

        return {
            localDateValue,
            localTopicValue,
            localLocationValue,
            localCommentsValue,
            updateBooking,
            closeOnOutsideClick
        }
    }
}
</script>