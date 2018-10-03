<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text--center">Edit lot</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-add" v-on:submit.prevent>
                    <div class="form-group">
                        <label for="lot__name">Lot Id</label>
                        <input
                                v-model="lot.id"
                                id="lot__id"
                                class="form-control"
                                type="text"
                                readonly>
                    </div>
                    <div class="form-group">
                        <label for="lot__name">Image</label>
                        <input
                                @change="previewFiles"
                                id="lot__name"
                                class="form-control"
                                type="file">
                    </div>
                    <div class="form-group">
                        <label for="lot__title">Title</label>
                        <input
                                v-model="lot.title"
                                id="lot__title"
                                class="form-control"
                                type="text"
                                placeholder="title">
                    </div>
                    <div class="form-group">
                        <label for="lot__desc">description</label>
                        <input
                                v-model="lot.description"
                                id="lot__desc"
                                class="form-control"
                                type="text"
                                placeholder="description">
                    </div>
                    <div class="form-group form-add__dates">
                        <div>
                            <label>Start</label>
                            <datepicker :input-class="'form-control'"
                                        v-model="start"
                                        :language="lang"
                                        :disabledDates="disabledDates"></datepicker>
                        </div>
                        <div>
                            <label>End</label>
                            <datepicker :input-class="'form-control'"
                                        v-model="end"
                                        :language="lang"
                                        :disabledDates="disabledDates2"></datepicker>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; text-align: center;">
            <div class="col-md-12">
                <a @click="checkBeforeSave"
                   class="btn btn-success btn-lg"
                   href="javascript:void(0)">Save</a>
                <router-link :to="{ name: 'MyLots' }" class="btn btn-danger btn-lg">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Datepicker from 'vuejs-datepicker';
    import { ru } from 'vuejs-datepicker/dist/locale';
    export default {
        name: 'UpdateLot',
        components: {
            Datepicker
        },
        data() {
            return {
                lot: {
                    id: this.$route.params.lotId,
                    image: null,
                    title: '',
                    description: ''
                },
                start: new Date(),
                end: new Date(),
                lang: ru,
                disabledDates: {
                    to: new Date(new Date() - 3600*24*1000)
                },
                disabledDates2: {
                    to: new Date(new Date() - 3600*24*1000)
                },
            }
        },
        watch: {
            start(val) {
                if (new Date(val).getTime() > new Date(this.end).getTime()) {
                    this.end = val;
                }
        
                this.disabledDates2.to = val;
            }
        },
        methods: {
            checkBeforeSave() {
                let hasError = false;
                
                if (this.lot.image == null || this.lot.title.length == 0 || this.lot.description.length == 0) {
                    hasError = true;
                }
        
                hasError ?
                    alert('Заполните все поля редактируемого лота.') :
                    this.saveLot();
            },
            previewFiles() {
                this.lot.image = event.target.files[0];
            },
            saveLot() {
                let formData = new FormData();
                formData.append('id', this.lot.id);
                formData.append('image', this.lot.image, this.lot.image.name);
                formData.append('start', Math.round(this.start.getTime()/1000));
                formData.append('end', Math.round(this.end.getTime()/1000));
                formData.append('title', this.lot.title);
                formData.append('description', this.lot.description);
                
                this.$store.dispatch('updateLot', { lotId: this.lot.id, data: formData });
            },
        }
    }
</script>