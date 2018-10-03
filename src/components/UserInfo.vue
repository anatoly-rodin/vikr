<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'UsersList' }" class="btn btn-primary btn-sm">
                    <i class="glyphicon glyphicon-arrow-left"></i>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h1>User details</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Username</td>
                            <td>E-mail</td>
                            <td>List of roles</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ getInfo.id }}</td>
                            <td>{{ getInfo.username }}</td>
                            <td>{{ getInfo.email }}</td>
                            <td>
                                <ul>
                                    <li v-for="(role, index) in getInfo.roles" :key="index">{{ role }}</li>
                                </ul>
                            </td>
                            <td>
                                <router-link :to="{ name: 'EditUserRoles', params: { userId: id } }">
                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
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
        name: "UserInfo",
        data() {
            return {
                id: this.$route.params.userId
            }
        },
        created() {
            this.$store.dispatch('getUserById', this.id);
        },
        computed: {
            getInfo() {
                return this.$store.getters.getUserById;
            }
        }
    }
</script>
