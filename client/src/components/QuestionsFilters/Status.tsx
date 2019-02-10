import * as React from "react";
import StatusesAutocomplete from "../../components/Autocomplete/Statuses";
import { compose } from "react-apollo";

import {
  withStatusesQuery,
  WithStatusesQuery
} from "../../queries/withStatusesQuery";

interface OwnProps {
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & WithStatusesQuery;

function StatusBase(props: Props) {
  const { statuses, onChange, value } = props;
  const options = statuses.map(status => ({
    value: status.id,
    label: status.name
  }));

  return (
    <StatusesAutocomplete
      value={value}
      label="Status"
      placeholder="Filter by Status"
      options={options}
      onChange={onChange}
      isMulti={true}
    />
  );
}

const Status: React.ComponentType<OwnProps> = compose(withStatusesQuery)(
  StatusBase
);

export default Status;
