<script setup>
import { onMounted, ref } from 'vue';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';

let imageBuilder = imageUrlBuilder(client);

const groqQuery = `*[_type=='generalSettings']`;

const dataFooter = ref([]);
onMounted(() => {
    client.fetch(groqQuery).then((data) => {
      dataFooter.value = data[0];
    });
});

const imageUrlFor = (source) => {
    return imageBuilder.image(source);
};
</script>

<template>
<footer class="px-6 py-12 bg-primary shadow-md">
   <div class="w-full flex py-4 justify-between flex-col items-end">
        <router-link to="/" class="flex pb-4">
            <img v-if="dataFooter.footerLogo" :src="imageUrlFor(dataFooter.footerLogo).width(200).url()" :alt="dataFooter.footerLogo.alt" />
        </router-link>
        <div class="inline-flex flex-col justify-center text-right text-lg text-white">
            <a v-if="dataFooter.siteEmail" :href="`mailto:${dataFooter.siteEmail}`">
            {{ dataFooter.siteEmail }}
            </a>
            <a v-if="dataFooter.sitePhone" :href="`tel:${dataFooter.sitePhone}`">
               {{ dataFooter.sitePhone }}
            </a>
            <div v-if='dataFooter.socIcons' class="flex justify-end">
                  <a v-for="socIcon in dataFooter.socIcons" 
                  :href="socIcon.urlSocialMedia" 
                  target="_blank" 
                  class="text-white hover:text-gray-400 ml-3">
                  <i v-if='socIcon.iconSocialMedia' :class="['fa-brands', `fa-${socIcon.iconSocialMedia}`]" class="text-2xl"></i>
                  </a>
            </div>
        </div>
   </div>
</footer>
</template>


