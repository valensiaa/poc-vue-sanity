<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation } from 'swiper';

import { imageUrlFor } from './shared/imageUrlFor';

SwiperCore.use([Navigation]);

const galleryData = ref(null);

const {content} = defineProps({
    content: {
        type: Object,
        required: true
    }
})

onMounted(() => {
      galleryData.value = content;
});
</script>

<template>
  <section class="w-full relative px-6 py-12" v-if="galleryData" >
    <div class="container p-6 mx-auto h-full flex flex-col">
      <h2 v-if="galleryData.galleryName" class="font-bold text-black text-5xl max-w-3xl mb-7">
        {{ galleryData.galleryName }}
      </h2>
      <Swiper
        slides-per-view="1"
        navigation
        class="w-full relative h-96"
      >
        <SwiperSlide v-for="image in galleryData.images" 
        :key="image._key">
          <img 
            :src="imageUrlFor(image.asset)" 
            :alt="image.alt" 
            class="w-full h-full object-cover absolute object-center" 
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
