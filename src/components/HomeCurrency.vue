<template>
    <div class="col s12 m6 l8">
        <div class="card teal bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">{{
                        $filters.localizeFilter("Exchange_Rate")
                    }}</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                {{ $filters.localizeFilter("Table_Currency") }}
                            </th>
                            <th>{{ $filters.localizeFilter("Table_Rate") }}</th>
                            <th>{{ $filters.localizeFilter("Table_Date") }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="cur in currencies" :key="cur">
                            <td>{{ cur }}</td>
                            <td>{{ rates[cur].toFixed(5) }}</td>
                            <td>{{ $filters.dateFilter(date, "date") }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["rates", "date"],
    data: () => ({
        currencies: ["RUB", "USD", "EUR"]
    })
}
</script>
