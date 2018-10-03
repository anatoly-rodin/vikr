<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>Users List</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>E-mail</th>
                        <th>Info</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in getUsers" :key="index">
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <router-link :to="{ name: 'UserInfo', params: { userId: user.id } }">
                                    <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'UsersList',
        data() {
            return {}
        },
        created() {
            this.$store.dispatch('getUsers');
        },
        computed: {
            getUsers() {
                return this.$store.state.users;
            }
        }
    }
</script>