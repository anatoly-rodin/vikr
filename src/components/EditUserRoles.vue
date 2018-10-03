<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text--center">Edit user roles</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-add" v-on:submit.prevent>
                    <div class="form-group">
                        <label>user</label>
                        <input
                                :value="getInfo.username"
                                id="lot__id"
                                class="form-control"
                                type="text"
                                readonly>
                    </div>
                    <div class="form-group">
                        <label>list of user roles</label>
                        <ul>
                            <li v-for="(role, index) in userRoles" :key="index">{{ role }}</li>
                        </ul>
                    </div>
                    <div class="form-group" :class="{ 'has-error': hasError }">
                        <label class="control-label">all user roles</label>
                        <select class="form-control" v-model="choosedRole">
                            <option disabled value="">choose the role</option>
                            <option v-for="(role, index) in getAllUsersRoles"
                                    :value="role"
                                    :key="index">{{ role }}</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; text-align: center;">
            <div class="col-md-12">
                <a @click="addRole"
                   class="btn btn-success btn-lg"
                   href="javascript:void(0)">add</a>
                <a @click="removeRole"
                   class="btn btn-primary btn-lg"
                   href="javascript:void(0)">remove</a>
                <router-link :to="{ name: 'UsersList' }" class="btn btn-danger btn-lg">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'EditUserRoles',
        data() {
            return {
                id: this.$route.params.userId,
                choosedRole: '',
                hasError: false
            }
        },
        created() {
            this.$store.dispatch('getUserRoles', this.id);
            this.$store.dispatch('getUserById', this.id);
        },
        methods: {
            addRole() {
                if (this.choosedRole.length <= 0) {
                    this.hasError = true;
                    alert('Не выбрана роль.');
                }
                else {
                    this.hasError = false;
                    this.$store.dispatch('addRole', { id: this.id, role: this.choosedRole });
                    this.choosedRole = '';
                }
            },
            removeRole() {
                if (this.choosedRole.length <= 0) {
                    this.hasError = true;
                    alert('Не выбрана роль.');
                }
                else {
                    this.hasError = false;
                    this.$store.dispatch('removeRole', { id: this.id, role: this.choosedRole });
                    this.choosedRole = '';
                }
            }
        },
        computed: {
            userRoles() {
                return this.$store.getters.userRoles;
            },
            getAllUsersRoles() {
                return this.$store.getters.getAllUsersRoles;
            },
            getInfo() {
                return this.$store.getters.getUserById;
            }
        }
    }
</script>
