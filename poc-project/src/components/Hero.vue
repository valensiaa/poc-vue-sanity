<script setup>
import { onMounted, ref } from 'vue';

import { imageUrlFor } from './shared/imageUrlFor';

const {content} = defineProps({
    content: {
        type: Object,
        required: true
    }
})

const heroData = ref(null);

const fetchPageData = () => {
    heroData.value = content;
    console.log(heroData.value)
};

onMounted(() => {
    fetchPageData()
});

</script>

<template>
<section class="w-full h-96 relative mb-12" v-if="heroData">
<img 
v-if="heroData.image" 
:src="imageUrlFor(heroData.image).url()" 
:alt="heroData.image.alt"
class="w-full h-full object-cover absolute object-center"/>
<div class="container p-6 mx-auto h-full flex flex-col items-start justify-center">
    <h1 v-if="heroData.heading" class="relative font-bold text-white text-5xl  max-w-3xl">{{ heroData.heading }}</h1>
    <p v-if="heroData.tagline" class="relative text-white text-xl  max-w-3xl my-3" >{{ heroData.tagline }}</p>
</div>
</section>

</template>