import * as React from "react";
import StatusesAutocomplete from "../../components/Autocomplete/Statuses";
import { compose } from "react-apollo";

import {
  withStatusesQuery,
  WithStatusesQuery
} from "../../hocs/withStatusesQuery";

interface OwnProps {}

type Props = OwnProps & WithStatusesQuery;

function StatusBase(props: Props) {
  const [selectedStatusOptions, setSelectedStatusOptions] = React.useState<
    Array<any>
  >([]);

  function handleStatusChange(item: any) {
    setSelectedStatusOptions(item);
  }

  const { statuses } = props;
  const options = statuses.map(status => ({
    value: status.id,
    label: status.name
  }));

  return (
    <StatusesAutocomplete
      value={selectedStatusOptions}
      label="Status"
      placeholder="Filter by Status"
      options={options}
      onChange={handleStatusChange}
      isMulti={true}
    />
  );
}

const Status: React.ComponentType<OwnProps> = compose(withStatusesQuery)(
  StatusBase
);

export default Status;
