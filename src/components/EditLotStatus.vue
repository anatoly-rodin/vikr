<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text--center">Edit lot status</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-add" v-on:submit.prevent>
                    <div class="form-group">
                        <label for="lot__id">Lot Id</label>
                        <input
                                v-model="id"
                                id="lot__id"
                                class="form-control"
                                type="text"
                                readonly>
                    </div>
                    <div class="form-group" :class="{ 'has-error': hasError }">
                        <label for="lot__status" class="control-label">Status</label>
                        <select id="lot__status"
                                class="form-control"
                                v-model="status">
                            <option disabled value="">choose the status</option>
                            <option v-for="(status, index) in getLotsStatus"
                                    :key="index"
                                    :value="status.id">
                                {{ status.name }}
                            </option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; text-align: center;">
            <div class="col-md-12">
                <a @click="changeStatus"
                   class="btn btn-success btn-lg"
                   href="javascript:void(0)">Save</a>
                <router-link :to="{ name: 'MyLots' }" class="btn btn-danger btn-lg">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'EditLotStatus',
        data() {
            return {
                id: this.$route.params.lotId,
                status: '',
                hasError: false
            }
        },
        created() {
            this.$store.dispatch('getLotStatuses');
        },
        methods: {
            changeStatus() {
               if (this.status.length <= 0) {
                    this.hasError = true;
                    alert('Не выбран статус.');
                }
                else {
                   this.hasError = false;
                   this.$store.dispatch('setLotStatus', { id: this.id, status: this.status })
               }
            }
        },
        computed: {
            getLotsStatus() {
                return this.$store.state.lotStatuses;
            }
        }
    }
</script>