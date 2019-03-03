
export default {
    name: 'email-filter',
    template: `
            <section class="email-filter">
                Filter :<input type=text placeholder="filter by text" class="filter-text"
                       v-model="filterBy.text" v-on:keyup="filterChanged">
                       <select v-model="filterBy.isRead" :value="filterBy.isRead" @change="filterChanged">
                            <option value="">All</option>
                            <option :value="true" >Read</option>
                            <option :value="false" >Unread</option>
                       </select>
                       <select v-model="sorter" :value="sorter" @change="sortChange">
                            <option value="date" >Sort By Date</option>
                            <option value="subject" >Sort By Subject</option>
                       </select>
                        <button type="button" v-on:click="reverseChanged">{{reverseState}}</button>
                        <button type="button" v-on:click="clearFilter">Clear</Button>
            </section>
    `,
    data() {
        return {
            filterBy: {
                text: '',
                isRead: ''
            },
            sorter: 'date',
            isReverse: false
        }
    },
    methods: {
        clearFilter() {
            var filter = false;
            var sorter = false;
            var reverse = false;

            if (this.filterBy.text !== '' || this.filterBy.isRead !== '') filter = true;
            this.filterBy.text = '';
            this.filterBy.isRead = '';

            if(this.sorter!='date') sorter = true;
            this.sorter = 'date';
            
            if(this.isReverse!==false) reverse = true;
            // no need to flipp this.isReverse value - inside reverseChanged function value is flipped
            
            if(filter) {
                this.filterChanged();
            } else if(sorter){
                this.sortChange()
            } else if(reverse){this.reverseChanged()}

        },
        filterChanged() {
            console.log('email-filter: filter changed, about to emit filterChanged event: ', this.filterBy);
            this.$emit('filterChanged', this.filterBy);
        },
        sortChange() {
            console.log('email-filter: sort changed, about to emit sortChange event: ', this.sorter);
            this.$emit('sortChange', this.sorter);
        },
        reverseChanged() {
            this.isReverse = !this.isReverse;
            console.log('email-filter: isReverse changed, about to emit reverseChange event: ', this.isReverse);
            this.$emit('reverseChange', this.isReverse);
        }
    },
    computed: {
        reverseState() {
            if (this.isReverse) return '↓';
            return '↑';
        }
    }
}