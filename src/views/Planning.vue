<template>
    <div>
        <div class="page-title">
            <h3>{{ $filters.localizeFilter("Menu_Plannig") }}</h3>
            <h4>{{ userInfo.bill }}</h4>
        </div>

        <Loader v-if="loading" />
        <p class="center" v-else-if="!categories">
            {{ $filters.localizeFilter("Empty_Categories") }}
            <router-link to="/categories">
                {{ $filters.localizeFilter("Add_First_Record") }}
            </router-link>
        </p>
        <section v-else>
            <div v-for="cat of categories" :key="cat.id">
                <p>
                    <strong>{{ cat.title }}:</strong>
                    {{ $filters.currencyFilter(cat.spend) }}
                    {{ $filters.localizeFilter("Out_Of") }}
                    {{ $filters.currencyFilter(cat.limit) }}
                </p>
                <div class="progress" v-tooltip="cat.tooltipText">
                    <div
                        class="determinate"
                        :class="[cat.progressColor]"
                        :style="{ width: cat.progressPercent + '%' }"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import localizeFilter from "@/filters/locale.filter"
export default {
    name: "planning",
    data: () => ({
        loading: true,
        categories: [],
        userInfo: 0
    }),
    async mounted() {
        await this.$store.dispatch("fetchInfo")
        const records = await this.$store.dispatch("fetchRecords")
        const categories = await this.$store.dispatch("fetchCategories")
        this.userInfo = this.$store.getters.info
        if (records && categories) {
            this.categories = categories.map((cat) => {
                const spend = records
                    .filter(
                        (record) =>
                            record.categoryId === cat.id &&
                            record.type === "outcome"
                    )
                    .reduce((total, record) => {
                        return (total += +record.amount)
                    }, 0)
                const percent = (100 * spend) / cat.limit
                const progressPercent = percent > 100 ? 100 : percent
                const progressColor =
                    percent < 60 ? "green" : percent < 100 ? "yellow" : "red"
                const tooltipValue = cat.limit - spend
                const tooltipText = `${
                    tooltipValue < 0
                        ? localizeFilter("Over_Budjet")
                        : localizeFilter("Rest")
                } ${Math.abs(tooltipValue)}`
                return {
                    ...cat,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltipText
                }
            })
        }
        this.loading = false
    }
}
</script>
