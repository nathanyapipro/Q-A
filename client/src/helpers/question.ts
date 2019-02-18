import { StatusType } from "../types/apollo";

export function getStatusLabel(status: StatusType): string {
  switch (status) {
    case StatusType.NEW:
      return "NEW";
    case StatusType.UNDER_REVIEW:
      return "UNDER REVIEW";
    case StatusType.ANSWERED:
      return "ANSWERED";
    case StatusType.DISMISSED:
      return "DISMISSED";
  }
}

export function getStatusColor(status: StatusType): string {
  switch (status) {
    case StatusType.NEW:
      return "#7D55D7";
    case StatusType.UNDER_REVIEW:
      return "#3A79E2";
    case StatusType.ANSWERED:
      return "#3CBB53";
    case StatusType.DISMISSED:
      return "#D50032";
  }
}
