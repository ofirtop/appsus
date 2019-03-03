
export default {
    name: 'email-filter',
    template: `
            <section class="email-filter">
                Filter :<input type=text placeholder="filter by text" class="filter-text"
                       v-model="filterBy.text" v-on:keyup="TextfilterChanged">
                       <select v-model="filterBy.isRead" :value="filterBy.isRead" @change="readStateFilterChange($event)">
                            <option value="">All</option>
                            <option :value="true" >Read</option>
                            <option :value="false" >Unread</option>
                       </select>
                       <select v-model="sorter" :value="sorter" @change="SortChange($event)">
                            <option value="date" >Sort By Date</option>
                            <option value="subject" >Sort By Subject</option>
                       </select>
                        <button type="button" v-on:click="setReverse">{{reverseState}}</button>
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
            this.filterBy.text = '';
            this.filterBy.isRead = '';
            this.TextfilterChanged();
        },
        TextfilterChanged() {
            console.log('email-filter: text filter changed:', this.filterBy);
            console.log('email-filter: about to emit filterChanged event: ',this.filterBy)
            this.$emit('filterChanged', this.filterBy);
        },
        readStateFilterChange(ev) {
            console.log('email-filter: read filter changed: ', this.filterBy);
            console.log('email-filter: about to emit filterChanged event: ',this.filterBy)
            this.$emit('filterChanged', this.filterBy);
        },
        SortChange(ev) {
            console.log('email-filter: sort changed: ', this.sorter);
            console.log('email-filter: about to emit sortChange event: ',this.sorter)
            this.$emit('sortChange', this.sorter);
        },
        setReverse() {
            this.isReverse = !this.isReverse;
            console.log('email-filter: isReverse changed: ', this.isReverse);
            console.log('email-filter: about to emit reverseChange event: ',this.isReverse)
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