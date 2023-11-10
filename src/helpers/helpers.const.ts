export default {
  formatDate: (date: string) => {
    return new Date(date);
  },
  formatDuration: (duration: number) => {
    function format(num: number, pad: string, length: number) {
      return (new Array(length + 1).join(pad) + num).slice(-length);
    }
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    const finalTime = format(minutes, '0', 2) + ':' + format(seconds, '0', 2);
    return finalTime;
  },
  formatTitle: (title: string) => {
    return title.replaceAll('_', ' ').replaceAll('.', ' ');
  }
};
