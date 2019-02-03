import moment from "moment";

export function fromNow(date: string) {
  return moment(date)
    .utc()
    .fromNow();
}

export function format(date: string) {
  return moment(date)
    .utc()
    .format("MMM Do YYYY, h:mm:ss a");
}
