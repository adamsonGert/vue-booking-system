<template> 
  <div class="flex items-center justify-center">
    <div class="col-span-12">
      <div class="overflow-visible">
        <table class="table text-gray-400 border-separate space-y-6 text-sm">
          <thead class="bg-gray-800 text-gray-500 hidden md:table-header-group">
            <tr>
              <th class="p-3 text-left">
                <div class="flex items-center">
                  <CalendarDaysIcon class="h-5 w-5 fill-white" /> 
                  <span class="ml-1 text-white">Date</span>
                </div>
              </th>
              <th class="p-3 text-left">
                <div class="flex items-center">
                  <TagIcon class="h-5 w-5 fill-white" />
                  <span class="ml-1 text-white">Topic</span>
                </div>
              </th>
              <th class="p-3 text-left">
                <div class="flex items-center">
                  <ChatBubbleBottomCenterTextIcon class="h-5 w-5 fill-white" />
                  <span class="ml-1 text-white">Comments</span>
                </div>
              </th>
              <th class="p-3 text-left">
                <div class="flex items-center">
                  <InformationCircleIcon class="h-5 w-5 fill-white" />
                  <span class="ml-1 text-white">Location</span>
                </div>
              </th>
              <th class="p-3 text-left">
                <div class="flex items-center">
                  <PencilIcon class="h-5 w-5 fill-white" />
                  <span class="ml-1 text-white">Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id" class="bg-gray-800 md:table-row block hidden sm:visible">
              <td class="p-3">
                  {{ formatDate(booking.date) }}
              </td>
              <td class="p-3">
                {{ booking.topic }}
              </td>
              <td class="p-3 max-w-[200px] overflow-x-auto whitespace-nowrap ">
                {{ booking.comments }}
              </td>
              <td class="p-3">
                {{ booking.location }}
              </td>
              <td class="p-3">
                <button @click="openModal(booking)" class="text-gray-400 hover:text-gray-100 mx-2">
                  Edit
                </button>
                <button @click="deleteBooking(booking.id)" class="text-gray-400 hover:text-gray-100 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id" class="bg-gray-800 md:table-row block md:hidden">
            <td class="flex items-center md:table-cell">
              <CalendarDaysIcon class="h-4 w-4 fill-white" /> 
              <strong class="mx-1 text-white">Date:</strong> {{ formatDate(booking.date) }}
            </td>
            <td class="flex items-center md:table-cell">
              <TagIcon class="h-4 w-4 fill-white" />
              <strong class="mx-1 text-white">Topic:</strong> {{ booking.topic }}
            </td>
            <td class="flex items-center md:table-cell">
              <ChatBubbleBottomCenterTextIcon class="h-4 w-4 fill-white" />
              <strong class="mx-1 text-white">Comments:</strong> {{ booking.comments }}
            </td>
            <td class="flex items-center md:table-cell">
              <InformationCircleIcon class="h-4 w-4 fill-white" />
              <strong class="mx-1 text-white">Location:</strong> {{ booking.location }}
            </td>
            <td class="flex items-center md:table-cell">
              <PencilIcon class="h-4 w-4 fill-white" />
              <strong class="mx-1 text-white">Action:</strong>
              <button @click="openModal(booking)" class="text-gray-400 hover:text-gray-100 mr-2">
                  Edit
              </button>
              <button @click="deleteBooking(booking.id)" class="text-gray-400 hover:text-gray-100">
                  Delete
              </button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    <editModal :open="isModalOpen" :booking="selectedBooking" @booking-updated="refreshBooking" @close="closeModal" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CalendarDaysIcon, TagIcon, ChatBubbleBottomCenterTextIcon, InformationCircleIcon, PencilIcon  } from '@heroicons/vue/24/solid'
import { auth } from '/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import editModal from './modals/editModal.vue'

export default {
  name: 'ViewBookings',
  setup() {
    const bookings = ref([]);
    const db = getFirestore();
    const userId = auth.currentUser.uid;
    const isModalOpen = ref(false);
    const selectedBooking = ref(null);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/bookings`));
      bookings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      bookings.value.sort((a, b) => b.date.toMillis() - a.date.toMillis());
    });

    const formatDate = (timestamp) => {
      const date = timestamp.toDate();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const openModal = (booking) => {      
      selectedBooking.value = booking;
      isModalOpen.value = true;
    }

    const closeModal = () => {
      isModalOpen.value = false;
    }

    const refreshBooking = async () => {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/bookings`));
      bookings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };


    const deleteBooking = async (bookingId) => {
      try {
          const bookingRef = doc(db, `users/${userId}/bookings`, bookingId);
          await deleteDoc(bookingRef);
          refreshBooking();
      } catch (error) {
          console.error("Error deleting booking: ", error);
      }
    };


    return {
      bookings,
      formatDate,
      isModalOpen,
      selectedBooking,
      openModal,
      closeModal,
      refreshBooking,
      deleteBooking
    };
  },
  components: {
    CalendarDaysIcon,
    TagIcon,
    ChatBubbleBottomCenterTextIcon,
    InformationCircleIcon,
    PencilIcon,
    editModal
  }
};
</script>

<style>
	.table {
		border-spacing: 0 15px;
	}

	.table tr {
		border-radius: 20px;
	}

	tr td:nth-child(n+5),
	tr th:nth-child(n+5) {
		border-radius: 0 .625rem .625rem 0;
	}

	tr td:nth-child(1),
	tr th:nth-child(1) {
		border-radius: .625rem 0 0 .625rem;
	}

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9CA3AF;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: #1f2937;
  }

  @media (max-width: 768px) {
    .table tbody tr {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid #2d3748;
      border-radius: 0.5rem;
    }

    .table td {
      margin-bottom: 0.5rem;
    }
}

</style>
