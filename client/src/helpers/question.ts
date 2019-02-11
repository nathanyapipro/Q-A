import { StatusNameType } from "../types/apollo";

export function getStatusLabel(status: StatusNameType): string {
  switch (status) {
    case StatusNameType.NEW:
      return "NEW";
    case StatusNameType.UNDER_REVIEW:
      return "UNDER REVIEW";
    case StatusNameType.ANSWERED:
      return "ANSWERED";
  }
}

export function getStatusColor(status: StatusNameType): string {
  switch (status) {
    case StatusNameType.NEW:
      return "#7D55D7";
    case StatusNameType.UNDER_REVIEW:
      return "#3A79E2";
    case StatusNameType.ANSWERED:
      return "#3CBB53";
  }
}
