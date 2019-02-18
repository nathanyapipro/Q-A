import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType, OptionsType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { compose } from "react-apollo";
import * as withTagsQuery from "../../queries/withTagsQuery";
interface OwnProps
  extends Omit<
    AutocompleteProps,
    "onInputChange" | "onChange" | "value" | "options" | "label"
  > {
  label?: string;
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & withTagsQuery.ChildProps;

function TagAutocompleteBase(props: Props) {
  const { onChange, tags } = props;

  const options: OptionsType = tags.map(tag => ({
    value: tag.id,
    label: tag.name
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
  OwnProps & withTagsQuery.InputProps
> = compose(withTagsQuery.hoc)(TagAutocompleteBase);

export default TagsAutocomplete;
