<template>
    <section id="catalog">
        <h1>
            Каталог автомобилей

            <button @click="exportToFile">
                Экспорт в JSON
            </button>
        </h1>

        <section class="page">
            <section class="filters">
                <h4>Поиск</h4>
                <input v-model="searchName" class="search" placeholder="Название..." type="text">
                <h4>Тип топлива</h4>
                <ul>
                    <li :class="{ active: filters['fuelType'].value == -1 }"
                        @click="selectFilter('fuelType', -1)">
                        Любой
                    </li>

                    <li :class="{ active: filters['fuelType'].value == 1 }"
                        @click="selectFilter('fuelType', 1)">
                        АИ-92
                    </li>

                    <li :class="{ active: filters['fuelType'].value == 2 }"
                        @click="selectFilter('fuelType', 2)">
                        АИ-95
                    </li>

                    <li :class="{ active: filters['fuelType'].value == 3 }"
                        @click="selectFilter('fuelType', 3)">
                        АИ-98
                    </li>
                </ul>
            </section>

            <section class="vehicles">
                <ul>
                    <li v-for="vehicle in getVehicles()">
                        <h2>
                            {{vehicle.name}}
                            <span>{{vehicle.fuelType}}</span>
                        </h2>
                    </li>
                </ul>
            </section>
        </section>
    </section>
</template>

<script>

definePageMeta({
    layout: 'default',
    middleware: [
        'auth'
    ]
})

export default {

    data() {
        return {
            vehicles: [
                
            ],

            searchName: "",

            filters: {
                "fuelType": {
                    value: -1
                },
            },
        }
    },

    mounted() {
        this.loadVehicles();
    },

    methods: {
        exportToFile: function() {
            const toText = JSON.stringify(this.getVehicles());

            var blob = new Blob([toText], {type: "application/json"});

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, "vehicles.json");
            } else {
                var dataURI = 'data:application/json;charset=utf-8,' + encodeURIComponent(toText);
                var downloadLink = document.createElement('a');
                downloadLink.href = dataURI;
                downloadLink.download = "data.json";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        },

        selectFilter: function(property, value) {
            this.filters[property].value = value;
        },

        getVehicles: function() {
            let result = this.vehicles;

            if (Object.keys(this.vehicles).length == 0)
                return [];
            
            for(const key of Object.keys(this.vehicles[0]))
            {
                console.log(key)

                if (this.filters[key] != undefined && this.filters[key].value != -1)
                {
                    result = result.filter((vehicle) => vehicle[key] == this.filters[key].value);
                }
            }

            if (this.searchName != "")
                result = result.filter((vehicle) => vehicle["name"].includes(this.searchName));

            return result;
        },

        loadVehicles: async function() {
            const result = await $fetch('api/get/vehicles');

            this.vehicles = result.data;
        }
    }
}


</script>

<style scoped>

#catalog {
    padding: 2rem;
}

#catalog > h1 {
    display: flex;
    justify-content: space-between;
}

#catalog > h1 button {

    padding: 0.4rem 1rem;
    border-radius: 10rem;

    color: var(--main-color);
    font-weight: 600;

    background: none;

    border: var(--main-color) 0.15rem solid;
    transition: background-color 0.25s, color 0.25s;
    cursor: pointer;
}

#catalog > h1 button:hover {
    color: white;
    background-color: var(--main-color);
}

#catalog .filters {
    width: 20%;
}

#catalog .filters ul {
    list-style-type: none;
    display: flex;
    padding-left: 0;
    flex-wrap: wrap;
}

#catalog .filters ul li {
    margin-right: 0.7rem;
    margin-bottom: 0.7rem;

    padding: 0.4rem 1rem;
    border-radius: 10rem;

    color: var(--main-color);
    font-weight: 600;

    border: var(--main-color) 0.15rem solid;
    transition: background-color 0.25s, color 0.25s;
    cursor: pointer;
}

#catalog .filters ul li.active, #catalog .filters ul li:hover {
    color: white;
    background-color: var(--main-color);
}

#catalog .filters .search {
    width: 70%;
    padding: 0.75rem;
    background-color: var(--light-gray-color);
    border: transparent 0.15rem solid;
    outline: none;
    border-radius: 10rem;

    transition: border 0.25s;
}

#catalog .filters .search:focus {
    border: var(--main-color) 0.15rem solid;
}

#catalog .page {
    display: flex;
}

#catalog .vehicles {
    width: 80%;
    height: 100%;
}

#catalog .vehicles ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
}

#catalog .vehicles ul li {
    min-width: 20rem;
    height: 4rem;

    border-radius: 14px;
    border: 1px solid #E2E2E2;
    background: linear-gradient(257deg, #D9D9D9 0%, #E4E4E4 0.01%, #FFF 46.35%, #F6F4F4 100%);

    box-sizing: border-box;
    padding: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
}

#catalog .vehicles ul li h2 {
    margin: 0;
}

#catalog .vehicles ul li span {
    font-size: 1rem;
}

</style>