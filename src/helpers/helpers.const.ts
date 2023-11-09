

export default {
    formatDate: (date: string) => {
        return new Date(date);
    },
    formatTitle: (title: string) => {
        return title.replaceAll('_', ' ').replaceAll('.', ' ');
    }
};