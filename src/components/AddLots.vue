<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="text--center">Add lots</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-add" v-on:submit.prevent>
                    <div class="add-lots">
                        <div class="lot__item"
                             v-for="(lot, index) in lots"
                             :key="index"
                             v-if="lot.id == activeId && !lot.disabled">
                            <div class="form-group">
                                <label>Lot № {{ lotNumber + 1 }}</label>
                            </div>
                            <div class="form-group">
                                <label :for="'lot__name' + index">Image</label>
                                <input
                                        @change="previewFiles(index)"
                                        :id="'lot__name' + index"
                                        class="form-control"
                                        type="file">
                            </div>
                            <div class="form-group">
                                <label :for="'lot__title' + index">Title</label>
                                <input
                                        v-model.trim="lot.title"
                                        :id="'lot__title' + index"
                                        class="form-control"
                                        type="text"
                                        placeholder="title">
                            </div>
                            <div class="form-group">
                                <label :for="'lot__desc' + index">description</label>
                                <input
                                        v-model.trim="lot.description"
                                        :id="'lot__desc' + index"
                                        class="form-control"
                                        type="text"
                                        placeholder="description">
                            </div>
                            <button class="btn btn-danger"
                                    v-show="index > 0"
                                    @click.prevent="deleteLot(lot.id)">
                                <i class="glyphicon glyphicon-remove"></i>
                                delete lot
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <a class="btn btn-primary"
                           :class="{ 'disabled': activeId < 2 }"
                           href="javascript:void(0);"
                           @click="switchPrevLot"
                           role="button">
                            <i class="glyphicon glyphicon-arrow-left"></i>
                        </a>
                        <a class="btn btn-primary"
                           :class="{ 'disabled': !areMoreLots }"
                           @click="switchNextLot"
                           href="javascript:void(0);"
                           role="button"
                           style="margin-right: 5px;">
                            <i class="glyphicon glyphicon-arrow-right"></i>
                        </a>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success"
                                @click.prevent="addNewLot">Add lot</button>
                    </div>
                    <div class="form-group form-add__dates">
                        <div>
                            <label>Start</label>
                            <datepicker :input-class="'form-control'"
                                        v-model="start"
                                        :language="lang"
                                        :monday-first="true"
                                        :disabledDates="disabledDate"
                            ></datepicker>
                        </div>
                        <div>
                            <label>End</label>
                            <datepicker :input-class="'form-control'"
                                        v-model="end"
                                        :language="lang"
                                        :monday-first="true"
                                        :disabledDates="disabledDate2"
                            ></datepicker>
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
                <router-link :to="{ name: 'Home' }" class="btn btn-danger btn-lg"
                   href="javascript:void(0)">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Datepicker from 'vuejs-datepicker';
    import { ru } from 'vuejs-datepicker/dist/locale';
    export default {
        name: 'AddLots',
        components: {
            Datepicker
        },
        data() {
            return {
                activeId: 1,
                lots: [
                    {
                        id: 1,
                        image: null,
                        title: null,
                        description: null,
                        disabled: false
                    }
                ],
                lang: ru,
                disabledDate: {
                    to: new Date(new Date() - 3600*24*1000)
                },
                disabledDate2: {
                    to: new Date(new Date() - 3600*24*1000)
                },
                start: new Date(),
                end: new Date(),
                maxLotQuantity: 10
            }
        },
        watch: {
            start(val) {
                if (new Date(val).getTime() > new Date(this.end).getTime()) {
                    this.end = val;
                }
    
                this.disabledDate2.to = val;
            }
        },
        methods: {
            previewFiles(id) {
                this.lots[id].image = event.target.files[0];
            },
            addNewLot() {
                let lastIndex = this.lots[this.lots.length - 1].id;

                let newLot = {
                    id: ++lastIndex,
                    image: null,
                    title: null,
                    description: null,
                    disabled: false
                };
                
                this.lots.push(newLot);
                this.activeId = newLot.id;
            },
            deleteLot(id) {
                let ind = null;
                
                this.lots.forEach(function(item, index) {
                    if (item.id == id) {
                        item.disabled = true;
                        ind = index;
                    }
                });
                
               for (let i = ind; i--;) {
                   if (!this.lots[i].disabled) {
                       this.activeId = this.lots[i].id;
                       break;
                   }
               }
            },
            checkBeforeSave() {
                let hasError = false;
                this.lots.forEach(lot => {
                    if (!lot.disabled) {
                        if (lot.image == null || lot.title.length == 0 || lot.description.length == 0) {
                            hasError = true;
                            return;
                        }
                    }
                });
                
                hasError ?
                    alert('Заполните все поля создаваемых лотов.') :
                    this.saveLots();
            },
            saveLots() {
                let formData = new FormData(),
                    index = 0;
                
                formData.append('count', this.lots.length - 1);
                
                this.lots.forEach(lot => {
                    if (!lot.disabled) {
                        formData.append('image' + index, lot.image, lot.image.name);
                        formData.append('title'+ index, lot.title);
                        formData.append('description'+ index, lot.description);
                    }
                    
                    index++;
                });
    
                formData.append('start', Math.round(this.start.getTime()/1000));
                formData.append('end', Math.round(this.end.getTime()/1000));
                
                this.$store.dispatch('saveLots', formData);
            },
            switchPrevLot() {
                var ind = 1;
                var _self = this;

                this.lots.forEach(function(item, index) {
                    if (item.id == _self.activeId) {
                        ind = index;
                    }
                });
                
                for (let i = ind; i--;) {
                    if (!this.lots[i].disabled) {
                        this.activeId = this.lots[i].id;
                        break;
                    }
                }
            },
            switchNextLot() {
                var ind = 1;
                var _self = this;
    
                this.lots.forEach(function(item, index) {
                    if (item.id == _self.activeId) {
                        ind = index;
                    }
                });
    
                for (let i = ind + 1; i < this.lots.length; i++) {
                    if (!this.lots[i].disabled) {
                        this.activeId = this.lots[i].id;
                        break;
                    }
                }
            }
        },
        computed: {
            isShowArrows() {
                return (this.lots.length > 1) ? true : false;
            },
            lotsQuantity() {
                return this.lots.filter(item => item.disabled == false).length;
            },
            areMoreLots() {
                for (let i = this.activeId; i < this.lots.length; i++) {
                    if (!this.lots[i].disabled) {
                        return true;
                    }
                }
                
                return false;
            },
            lotNumber() {
                let tmp = this.lots.filter(item => !item.disabled);
                
                return tmp.findIndex(item => item.id == this.activeId);
            }
        }
    }
</script>