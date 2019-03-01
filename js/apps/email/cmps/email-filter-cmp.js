
export default {
    name:'email-filter',
    template:`
            <section class="email-filter">
                Filter :<input type=text placeholder="filter by text" class="filter-text"
                       v-model="filterBy.text" v-on:keyup="TextfilterChanged">
                       <select v-model="filterBy.isRead" :value="filterBy.isRead" @change="readMailStateChange($event)">
                            <option value="">All</option>
                            <option :value="true" >Read</option>
                            <option :value="false" >Unread</option>
                       </select>
                <button type="button" v-on:click="clearFilter">Clear</Button>
            </section>
    `,
    data(){
        return {
            filterBy: {
                text: '',
                isRead: ''
            }
        }
    },
    methods:{
        clearFilter() {
            this.filterBy.text = '';
            this.filterBy.isRead = '';
            this.TextfilterChanged();
        },
        TextfilterChanged(){
            console.log('filterChanged event fired~',this.filterBy);
            this.$emit('filterChanged',this.filterBy);
        },
        readMailStateChange(ev){
            console.log('readMailStateChange event received.. ',ev.target.value);
            console.log('readMailStateChange model: ',this.filterBy);
            this.$emit('filterChanged',this.filterBy);
        }
    },
    computed:{
    }
}