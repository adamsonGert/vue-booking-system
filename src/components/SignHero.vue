<template>
    <div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" :style="{ backgroundImage: `url(${heroImage})` }">
          <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div class="w-full px-24 z-10">
              <h1 class="text-5xl font-bold text-left tracking-wide">Bookify</h1>
              <p class="text-2xl text-left my-4">Streamlining Your Appointments with Ease.</p>
          </div>
      </div>
</template>

<script>
import heroImage from '../assets/hero-bg.webp';

export default {
name: 'SignHero',

data() {
    return {
      heroImage
    };
  }
}
</script>