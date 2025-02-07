<template>
    <div class="loader-container" v-if="loading">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'AppLoader',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style scoped>
.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(
        255,
        255,
        255,
        0.8
    ); /* Optional: Add a semi-transparent background */
    z-index: 9999; /* Ensure the loader is on top of other elements */
}

.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
