<script setup>
import { onMounted, ref } from 'vue';

import { PortableText } from '@portabletext/vue';
import myPortableTextComponents from './shared/CustomPortableText';
import { imageUrlFor } from './shared/imageUrlFor';

const {content} = defineProps({
    content: {
        type: Object,
        required: true
    }
})

const textImageData = ref(null);

const fetchPageData = () => {
  textImageData.value = content;
};

onMounted(() => {
    fetchPageData()
});

</script>

<template>
<section class="container mx-auto px-6 py-12" v-if="textImageData">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div class="flex flex-col items-start justify-center">
            <h2 v-if="textImageData.title" class="relative font-bold text-black text-5xl  max-w-3xl">{{ textImageData.title }}</h2>
            <PortableText v-if="textImageData.text" :value='textImageData.text' :components="myPortableTextComponents" />
        </div>
        <div>
            <img v-if="textImageData.image" :src="imageUrlFor(textImageData.image).url()" :alt=textImageData.image.alt />
        </div>
    </div>
</section>
</template>