import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType, OptionsType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { compose } from "react-apollo";
import * as withWorkspaceTagsQuery from "../../queries/withWorkspaceTagsQuery";
interface OwnProps
  extends Omit<
    AutocompleteProps,
    "onInputChange" | "onChange" | "value" | "options" | "label"
  > {
  label?: string;
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & withWorkspaceTagsQuery.ChildProps;

function TagAutocompleteBase(props: Props) {
  const { onChange, workspaceTags } = props;

  const options: OptionsType = workspaceTags.map(workspaceTag => ({
    value: workspaceTag.tag ? workspaceTag.tag.id : 0,
    label: workspaceTag.tag ? workspaceTag.tag.name : "None",
    description: workspaceTag.tag ? workspaceTag.tag.description : null,
    color: workspaceTag.tag ? workspaceTag.tag.color : null
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

  const { value, label, ...rest } = props;

  return (
    <Autocomplete
      {...rest}
      label={label}
      isClearable
      options={options}
      value={valueToValueType(value)}
      onChange={handleChange}
      isMulti
    />
  );
}

const TagsAutocomplete: React.ComponentType<
  OwnProps & withWorkspaceTagsQuery.InputProps
> = compose(withWorkspaceTagsQuery.hoc)(TagAutocompleteBase);

export default TagsAutocomplete;
