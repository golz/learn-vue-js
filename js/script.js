const app = new Vue({
    el: '#app',
    data: {
      fields: [
        {name: 'id', sortable: true, type: 'up'},
        {name: 'name', sortable: true, type: 'up'},
        {name: 'description' , sortable: true, type: 'up'},
        {name: 'quantity', sortable: true, type: 'up'},
        {name: 'action', sortable: false, type: 'up'},
      ],
      items: [],
      showedItems: [],
      name: '',
      description: '',
      quantity: 0,
      search: ''
    },
    created: function () {
      this.loadDummyData();
      this.showedItems = this.items;
    },
    methods: {
      loadDummyData: function () {
        this.items.push({id: 1, name: 'Razer Deathstalker', description: 'New Series of Razer', quantity: 32});
        this.items.push({id: 2, name: 'Razer Deadadder', description: 'Headset', quantity: 3});
        this.items.push({id: 3, name: 'Steelseries V12', description: 'New keyboard', quantity: 1});
        this.items.push({id: 4, name: 'Monitor LG1012', description: 'Discount 40%', quantity: 10});
        this.items.push({id: 5, name: 'Chroma Series', description: 'LED Series', quantity: 64});
        this.items.push({id: 6, name: 'ASUS ROG X100-02', description: 'Expensive Laptop for Programming', quantity: 32});
        this.items.push({id: 7, name: 'Sades Headphone', description: 'Low budget programmer (introvert)', quantity: 11});
        this.items.push({id: 8, name: 'New! Dazumba Speaker', description: 'High budget programmer (extrovert)', quantity: 99});
        this.items.push({id: 9, name: 'Programming Chair', description: 'Sleep with your chair without bed', quantity: 2});
      },
      addItem: function () {
        if(this.name.length < 1 || this.description.length < 1 || this.quantity < 1) return;
        this.items.push(
            {
              id: parseInt(this.items[this.items.length-1].id) + 1,
              name: this.name,
              description: this.description,
              quantity: this.quantity
            }
          );
        this.showedItems = this.items;
        this.reset();
      },
      removeItem: function(id) {
        const index = this.items.findIndex(item => item.id == id);
        this.items.splice(index, 1);
      },
      reset: function () {
        this.name= '';
        this.description= '';
        this.quantity= 0;
        this.search= '';
      },
      sortBy: function(key){
        let fieldData = this.fields[key].name;
        if(this.fields[key].type == 'up'){
          this.showedItems.sort(function(a,b){
            if(a[fieldData] < b[fieldData]) return -1;
            if(a[fieldData] > b[fieldData]) return 1;
          });
          this.fields[key].type = 'down';
        } else if(this.fields[key].type == 'down'){
          this.showedItems.sort(function(a,b){
            if(a[fieldData] < b[fieldData]) return 1;
            if(a[fieldData] > b[fieldData]) return -1;
          });
          this.fields[key].type = 'up';
        }
      }
    },
    watch: {
      search: function(val) {
        this.showedItems = [];
        if(val == '' || this.search == ''){
          this.showedItems = this.items;
        } else {
          var temps = [];
          /**
          * without lambda expression
          */
          // this.items.forEach(function(element){
          //   if(element.name.includes(val)){
          //     temps.push(element);
          //   }
          // });

          /**
          * using lambda expression
          */
          temps = this.items.filter( item => item.name.toLowerCase().includes(val.toLowerCase()) );
          this.showedItems = temps;
        }
      },
      items: function(items) {
        this.showedItems = items;
      }
    }
});
