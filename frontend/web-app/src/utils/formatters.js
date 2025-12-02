const formatCurrency = (value) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value / 100);
};

const formatDate = (value) => {
	const date = new Date(value);
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeZone: "America/Sao_Paulo",
	}).format(date);
};

const formatDateTime = (value) => {
	const date = new Date(value);
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeStyle: "short",
		timeZone: "America/Sao_Paulo",
	}).format(date);
};

const formatDateToISO = (value) => {
	if (!value) return null;
	const [year, month, day] = value.split("-").map(Number);
	const date = new Date(year, month - 1, day);
	return date.toISOString();
};

export { formatCurrency, formatDate, formatDateTime, formatDateToISO };
