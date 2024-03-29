import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType, OptionsType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { compose } from "react-apollo";
import * as withStatusesQuery from "../../queries/withStatusesQuery";
import { getStatusLabel } from "../../helpers/question";

interface OwnProps
  extends Omit<
    AutocompleteProps,
    "onInputChange" | "onChange" | "value" | "options"
  > {
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & withStatusesQuery.ChildProps;

function StatusAutocompleteBase(props: Props) {
  const { statuses, onChange } = props;

  const options: OptionsType = statuses.map(status => ({
    value: status.id,
    label: getStatusLabel(status.status)
  }));

  const valueToValueType = (value?: number | Array<number>): ValueType => {
    const allValues = value instanceof Array ? value : [value];

    const selectedOptions = options.filter(o =>
      allValues.some(v => v === o.value)
    );

    return selectedOptions;
  };

  const handleChange = (valueType: ValueType) => {
    if (onChange) {
      onChange(autocompleteHelper.valueTypeToValue(valueType));
    }
  };

  const { value, ...rest } = props;

  return (
    <Autocomplete
      {...rest}
      isSearchable={false}
      options={options}
      value={valueToValueType(value)}
      onChange={handleChange}
    />
  );
}

const StatusAutocomplete: React.ComponentType<
  OwnProps & withStatusesQuery.InputProps
> = compose(withStatusesQuery.hoc)(StatusAutocompleteBase);

export default StatusAutocomplete;
