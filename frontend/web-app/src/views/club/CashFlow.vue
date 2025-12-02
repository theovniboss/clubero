<template>
    <h2>Fluxo de caixa </h2>
    <div class="w-full flex gap-5 justify-between ">
        <div class="flex flex-col items-center justify-center min-w-[300px]  p-5 text-white rounded-lg"
            :class="{ 'bg-danger': cashFlow[cashFlow.length - 1]?.balance < 0, 'bg-success': cashFlow[cashFlow.length - 1]?.balance > 0 }">
            <span class="text-center">Saldo no caixa hoje</span>
            <span class="text-center font-semibold text-3xl">
                {{ formatCurrency(cashFlow[cashFlow.length - 1]?.balance) }}
            </span>
        </div>
        <div class="flex gap-10 border border-gray-300 bg-white p-5  rounded-lg">
            <div class="flex flex-col w-[200px]">
                <span class="text-center">

                    {{ new Date(year, new Date().getMonth()).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
                    }}
                </span>
                <p class="text-sm flex">Receita:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.actualMonth.credit) }}
                    </span>
                </p>
                <p class="text-sm flex">Despesa:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.actualMonth.debit) }}
                    </span>
                </p>
                <p class="border-t mt-1 text-sm flex">Total:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.actualMonth.credit
                            - results.actualMonth.debit) }}
                    </span>
                </p>
            </div>
        </div>

        <div class="flex gap-10 border border-gray-300 p-5  rounded-lg">
            <div class="flex flex-col w-[200px]">
                <span class="text-center">1º Semestre/{{ year }}</span>
                <p class="text-sm flex">Receita:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.firstSemester.credit) }}
                    </span>
                </p>
                <p class="text-sm flex">Despesa:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.firstSemester.debit) }}
                    </span>
                </p>
                <p class="border-t mt-1 text-sm flex">Total:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.firstSemester.credit
                            - results.firstSemester.debit) }}
                    </span>
                </p>
            </div>
            <div class="flex flex-col w-[200px]">
                <span class="text-center">2º Semestre/{{ year }}</span>
                <p class="text-sm flex">Receita:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.secondSemester.credit) }}
                    </span>
                </p>
                <p class="text-sm flex">Despesa:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.secondSemester.debit) }}
                    </span>
                </p>
                <p class="border-t mt-1 text-sm flex">Total:
                    <span class="ml-auto text-right">
                        {{ formatCurrency(results.secondSemester.credit -
                            results.secondSemester.debit) }}
                    </span>
                </p>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center min-w-[300px]  p-5 bg-primary text-white rounded-lg">
            <span class="text-center">Fluxo de caixa de:</span>
            <span class="text-center font-semibold text-3xl">
                <div class="relative">
                    <div class="flex items-center ml-2 cursor-pointer" @click="showYears = !showYears">
                        <span>{{ year }}</span>
                        <span class="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </div>
                    <div class="absolute flex flex-col boxed w-full text-primary p-2 text-lg" v-if="showYears">
                        <span v-for="y in results.years" :key="year" @click="year = y; showYears = false"
                            class="p-1 hover:bg-gray-100 cursor-pointer rounded">
                            {{ y }}
                        </span>
                    </div>
                </div>
            </span>
        </div>
    </div>



    <div class="mt-5 area w-full flex flex-col">
        <h3 class="font-semibold mb-2">Lançamentos</h3>
        <div class="overflow-y-auto border border-gray-200 relative max-h-[400px]">
            <table class="is-table">
                <thead
                    class="sticky top-[0px] z-10 after:bg-gray-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px]">
                    <tr>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Time</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Acumulado</th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cashFlowItem in cashFlow" :key="cashFlowItem.id" class="">
                        <td>{{cashFlowTypes.find(x => x.value == cashFlowItem.category.type)?.label}}</td>
                        <td>{{ cashFlowItem.category.name }}</td>
                        <td>{{ cashFlowItem.team?.name }}</td>
                        <td>{{ cashFlowItem.description }}</td>
                        <td>{{ formatCurrency(cashFlowItem.amount) }}</td>
                        <td>{{ formatDate(cashFlowItem.occurredAt) }}</td>
                        <td
                            :class="{ 'text-danger-500': cashFlowItem.balance < 0, 'text-success-500': cashFlowItem.balance > 0 }">
                            {{ formatCurrency(cashFlowItem.balance) }}</td>
                        <td>
                            <Button class="mr-1 primary small">
                                <font-awesome-icon icon="fa-solid fa-edit" />
                            </Button>
                            <Button class="small danger">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </Button>
                        </td>
                    </tr>
                </tbody>
                <tfoot
                    class="sticky bottom-0 bg-white z-10 before:bg-gray-200 before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]">
                    <tr>
                        <td>
                            <Select id="tipo" v-model="cashFlowFormType" :options="cashFlowTypes"></Select>
                        </td>
                        <td><Select id="categoria" v-model.number="cashFlowForm.categoryId"
                                :options="cashFlowCategoriesFiltred"></Select>
                        </td>
                        <td><Select id="team" v-model.number="cashFlowForm.teamId" :options="teams"
                                placeholder="Todos os times"></Select></td>
                        <td class="min-w-[200px]"><Input type="text" placeholder="Descrição"
                                v-model="cashFlowForm.description" class="w-full" />
                        </td>
                        <td class="min-w-[200px]">
                            <CurrencyInput type="text" placeholder="Valor" v-model="cashFlowForm.amount" />
                        </td>
                        <td><Input type="date" placeholder="Data" v-model="cashFlowForm.occurredAt" /></td>

                        <td colspan="2">
                            <Button @click="saveCashFlow" class="primary">
                                <font-awesome-icon icon="fa-solid fa-save" class="mr-2" />
                                Salvar
                            </Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<script setup>
import Input from "../../components/form/Input.vue";
import Select from "../../components/form/Select.vue";
import Button from "../../components/elements/Button.vue";
import CurrencyInput from "../../components/form/CurrencyInput.vue";
import servCashFlow from "../../services/cashFlow";
import { formatCurrency, formatDate, formatDateToISO } from "../../utils/formatters";

import { ref, onMounted, computed } from "vue";
import { useClubStore } from "../../store/club.store";

const showYears = ref(false);
const year = ref(new Date().getFullYear());
const cashFlowCategories = ref([]);
const cashFlow = ref([]);
const cashFlowFormType = ref('');
const cashFlowTypes = ref([
    { value: 'CREDIT', label: 'Receita' },
    { value: 'DEBIT', label: 'Despesa' },
]);
const cashFlowForm = ref({
    categoryId: null,
    teamId: null,
    description: '',
    amount: 0,
    occurredAt: '',
});

const selectedClub = computed(() => useClubStore().selectedClub);
const teams = computed(() => selectedClub.value.teams.map(team => ({ value: team.id, label: team.name })));
const cashFlowCategoriesFiltred = computed(() => cashFlowCategories.value.filter(category => category.type === cashFlowFormType.value).map(category => ({ value: category.id, label: category.name })));

const results = computed(() => {
    const cashFlowYear = cashFlow.value.filter(cf => new Date(cf.occurredAt).getFullYear() === year.value);
    const cashFlowMonth = cashFlowYear.filter(cf => new Date(cf.occurredAt).getMonth() === new Date().getMonth());
    const cashFlowFirstSemester = cashFlowYear.filter(cf => new Date(cf.occurredAt).getMonth() < 6);
    const cashFlowSecondSemester = cashFlowYear.filter(cf => new Date(cf.occurredAt).getMonth() >= 6);

    return {
        years: cashFlow.value.map(cf => new Date(cf.occurredAt).getFullYear()).filter((value, index, self) => self.indexOf(value) === index),
        actualMonth: {
            credit: cashFlowMonth.filter(cf => cf.category.type === 'CREDIT').reduce((total, cf) => total + cf.amount, 0),
            debit: cashFlowMonth.filter(cf => cf.category.type === 'DEBIT').reduce((total, cf) => total + cf.amount, 0),
        },
        firstSemester: {
            credit: cashFlowFirstSemester.filter(cf => cf.category.type === 'CREDIT').reduce((total, cf) => total + cf.amount, 0),
            debit: cashFlowFirstSemester.filter(cf => cf.category.type === 'DEBIT').reduce((total, cf) => total + cf.amount, 0),
        },
        secondSemester: {
            credit: cashFlowSecondSemester.filter(cf => cf.category.type === 'CREDIT').reduce((total, cf) => total + cf.amount, 0),
            debit: cashFlowSecondSemester.filter(cf => cf.category.type === 'DEBIT').reduce((total, cf) => total + cf.amount, 0),
        },
    }
})







onMounted(() => {
    getCashFlowCategories();
    getCashFlow();
});


const getCashFlowCategories = async () => {
    try {
        const response = await servCashFlow.getCashFlowCategories(selectedClub.value.id);
        cashFlowCategories.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const getCashFlow = async () => {
    try {
        const response = await servCashFlow.getCashFlows(selectedClub.value.id);
        cashFlow.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const saveCashFlow = async () => {
    try {
        const cashFlowFormCopy = JSON.parse(JSON.stringify(cashFlowForm.value));
        cashFlowFormCopy.occurredAt = formatDateToISO(cashFlowFormCopy.occurredAt);
        cashFlowFormCopy.clubId = selectedClub.value.id;
        if (cashFlowFormCopy.teamId === '') {
            cashFlowFormCopy.teamId = null;
        }
        await servCashFlow.createCashFlow(cashFlowFormCopy);
        getCashFlow();
    } catch (error) {
        console.error(error);
    }
};


</script>
