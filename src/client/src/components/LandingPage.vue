<template>
    <div class="container">
        <h1 class="my-4">
            <font-awesome-icon icon="book" class="icon-spacing" /> Challenge
            Book Store
        </h1>
        <div v-if="error" class="alert alert-danger mt-4">{{ error }}</div>
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in paginatedBooks" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>
                        <router-link
                            :to="`/book/${book.id}`"
                            class="btn btn-primary"
                            @click="setLoading"
                        >
                            <font-awesome-icon icon="book" /> View Details
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage">
                        Previous
                    </button>
                </li>
                <li
                    class="page-item"
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ active: currentPage === page }"
                >
                    <button class="page-link" @click="goToPage(page)">
                        {{ page }}
                    </button>
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                >
                    <button class="page-link" @click="nextPage">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            books: [],
            error: null,
            currentPage: 1,
            pageSize: 5,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.books.length / this.pageSize)
        },
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.pageSize
            const end = start + this.pageSize
            return this.books.slice(start, end)
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
            }
        },
        goToPage(page) {
            this.currentPage = page
        },
        setLoading() {
            this.$root.$emit('set-loading', true)
        },
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/books')
            this.books = response.data.books
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    },
}
</script>

<style scoped>
.table {
    margin-top: 20px;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

.btn font-awesome-icon {
    margin-right: 5px;
}

.pagination {
    margin-top: 20px;
}

.icon-spacing {
    margin-right: 5px;
}
</style>
