<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>My lots</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Lot id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Updated</th>
                            <th>Details</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(lot, index) in getLots" :key="index">
                        <td>{{ lot.id }}</td>
                        <td>{{ lot.title }}</td>
                        <td>{{ lot.description }}</td>
                        <td>
                            {{ lot.status }}
                            <router-link :to="{ name: 'EditLotStatus', params: { lotId: lot.id }}">
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </router-link>
                        </td>
                        <td>{{ lot.imageName ? 'exist' : 'empty' }}</td>
                        <td >{{ getFormattedDate(lot.updatedAt) }}</td>
                        <td>
                            <router-link :to="{ name: 'LotInfo', params: { lotId: lot.id }}">
                                <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{ name: 'UpdateLot', params: { lotId: lot.id }}">
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
    import moment from 'moment';
    export default {
        name: 'MyLots',
        data() {
            return {}
        },
        created() {
            this.$store.dispatch('getCreatorLots');
        },
        methods: {
            getFormattedDate(utcDate) {
                return moment.parseZone(utcDate).format('DD-MM-YY');
            }
        },
        computed: {
            getLots() {
                return this.$store.state.userLots;
            }
        }
    }
</script>