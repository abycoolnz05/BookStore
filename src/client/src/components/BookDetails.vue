<template>
    <div class="container">
        <AppLoader :loading="loading" />
        <div v-if="book && !loading">
            <h1 class="my-4">{{ book.title }}</h1>
            <table class="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">Author</th>
                        <td>{{ book.author }}</td>
                    </tr>
                    <tr>
                        <th scope="row">ISBN</th>
                        <td>{{ book.isbn }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Price</th>
                        <td>${{ book.price }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Available Stock</th>
                        <td>{{ book.availableStock }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary me-2" @click="purchaseBook">
                <font-awesome-icon icon="shopping-cart" /> Purchase
            </button>
            <router-link to="/" class="btn btn-secondary mt-3">
                <font-awesome-icon icon="arrow-left" /> Back to List
            </router-link>
            <div v-if="error" class="alert alert-danger mt-4">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AppLoader from './AppLoader.vue'

export default {
    components: {
        AppLoader,
    },
    data() {
        return {
            book: null,
            error: null,
            loading: true,
        }
    },
    async created() {
        try {
            const response = await axios.get(
                `http://localhost:8000/books/${this.$route.params.id}`
            )
            this.book = response.data.book
        } catch (error) {
            this.error = error.message
            console.error(error)
        } finally {
            this.loading = false
        }
    },
    methods: {
        async purchaseBook() {
            try {
                await axios.post(
                    `http://localhost:8000/books/${this.$route.params.id}/purchase`
                )
                alert('Purchase successful')
            } catch (error) {
                alert('Purchase failed')
                console.error(error)
            }
        },
    },
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

.table {
    margin-bottom: 20px;
}

button {
    margin-top: 20px;
}
</style>
