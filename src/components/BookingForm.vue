<template>
  <form class="block mt-5" @submit.prevent="submitBooking">
    <span v-if="showSuccessMessage" class="my-4 block bg-green-100 rounded-sm border-green-500 text-green-700 p-4" role="alert">
      Booking submitted successfully!
    </span>
    <label for="datepicker" class="block text-sm font-medium mb-2">Date</label>
    <VueDatePicker placeholder="Pick a date" v-model="selectedDate" :disabled-week-days="[6, 0]" required class="w-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 placeholder-gray-900 hover:cursor-pointer"></VueDatePicker>
    <span class="mt-1 block text-red-500" v-if="errors.date">{{ errors.date }}</span>

    <label for="bookingTopic" class="block text-sm font-medium mt-5 mb-3">Topic</label>
    <select id="bookingTopic" required v-model="selectedTopic" class="text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 py-2 pl-2 block w-full border-gray-200 rounded-sm text-sm">
        <option selected>- Topic -</option>
        <option value="Consultation">Consultation</option>
        <option value="UX & UI">UX & UI</option>
        <option value="Front-end">Front-end</option>
        <option value="Design">Design</option>
        <option value="Other">Other</option>
    </select>
    <span class="mt-1 block text-red-500" v-if="errors.topic">{{ errors.topic }}</span>

    <label for="location" class="block text-sm font-medium mt-5 mb-3">Location</label>
    <div class="flex space-x-4">
      <div class="flex items-center">
        <input v-model="selectedLocation" required id="office" type="radio" name="location" value="Office" class="h-4 w-4 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer">
        <label for="office" class="text-md font-medium ml-2 hover:cursor-pointer">Office</label>
      </div>

      <div class="flex items-center">
        <input v-model="selectedLocation" required id="zoom" type="radio" name="location" value="Zoom call" class="h-4 w-4 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer">
        <label for="zoom" class="text-md font-medium ml-2 hover:cursor-pointer">Zoom call</label>
      </div>

      <div class="flex items-center">
        <input v-model="selectedLocation" required id="meet" type="radio" name="location" value="Google meet" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer">
        <label for="meet" class="text-md font-medium ml-2 hover:cursor-pointer">Google meet</label>
      </div>
    </div>
    <span class="mt-1 block text-red-500" v-if="errors.location">{{ errors.location }}</span>
    
    <label for="comment" class="block text-sm font-medium mt-5 mb-3">Comments</label>
    <textarea id="comment"
        v-model="comments" 
        placeholder="Please provide any additional details that will help us prepare for your appointment"
        class="my-2 p-4 w-full h-32 text-gray-900 placeholder-gray-500 rounded-sm"
    ></textarea>

    <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Submit Booking
    </button>
  </form>
</template>
  
  <script>
  import { ref } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { getFirestore, addDoc, collection } from 'firebase/firestore';
  import { auth } from '/firebaseConfig';
  
  export default {
    name: 'BookingForm',
    components: { VueDatePicker },
    setup() {
      const userId = auth.currentUser.uid;
      const selectedDate = ref('');
      const selectedTopic = ref('- Topic -')
      const selectedLocation = ref(null);
      const showSuccessMessage = ref(false);
      const comments = ref('');
      const db = getFirestore();
      const isValid = ref(true);
      const errors = ref({
          date: '',
          topic: '',
          location: ''
      });

      const validateForm = () => {
        let valid = true;
        const errorMessages = {};

        if (!selectedDate.value) {
            valid = false;
            errorMessages.date = "Date is required";
        }

        if (selectedTopic.value === '- Topic -') {
            valid = false;
            errorMessages.topic = "Topic is required";
        }

        if (!selectedLocation.value) {
            valid = false;
            errorMessages.location = "Location is required";
        }

        errors.value = errorMessages;
        isValid.value = valid;

        return valid;
    };

      const resetForm = () => {
        selectedDate.value = '';
        selectedTopic.value = '- Topic -';
        selectedLocation.value = '';
        comments.value = '';
      };

      const submitBooking = async () => {

        if (!validateForm()) {
          return;
        }

        try {
          await addDoc(collection(db, `users/${userId}/bookings`), {
            date: selectedDate.value,
            topic: selectedTopic.value,
            location: selectedLocation.value,
            comments: comments.value
          });

          resetForm();
          showSuccessMessage.value = true;

          setTimeout(() => {
            showSuccessMessage.value = false;
          }, 3000);
        } catch (e) {
            console.error("Error adding booking: ", e);
        }
      };

      return {
        selectedTopic,
        selectedDate,
        selectedLocation,
        comments, 
        showSuccessMessage,
        errors,
        submitBooking,
      };
    }
  };
  </script>