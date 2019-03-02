import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType, OptionsType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { compose } from "react-apollo";
import * as withWorkspacesQuery from "../../queries/withWorkspacesQuery";

interface OwnProps
  extends Omit<
    AutocompleteProps,
    "onInputChange" | "onChange" | "value" | "options"
  > {
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & withWorkspacesQuery.ChildProps;

function WorkspaceAutocompleteBase(props: Props) {
  const { workspaces, onChange } = props;

  const options: OptionsType = workspaces.map(workspace => ({
    value: workspace.id,
    label: workspace.name
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
      options={options}
      value={valueToValueType(value)}
      onChange={handleChange}
    />
  );
}

const WorkspaceAutocomplete: React.ComponentType<
  OwnProps & withWorkspacesQuery.InputProps
> = compose(withWorkspacesQuery.hoc)(WorkspaceAutocompleteBase);

export default WorkspaceAutocomplete;
