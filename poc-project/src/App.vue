<template>
    <Header />
    <div class="main flex-auto">
        <router-view />
    </div>
    <Footer />
</template>

<script>
import Footer from "./layouts/Footer.vue";
import Header from "./layouts/Header.vue";

export default {
    components: {
        Header,
        Footer,
    },
};
</script>
