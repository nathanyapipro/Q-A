import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType, OptionsType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";

interface Props
  extends Omit<AutocompleteProps, "onInputChange" | "onChange" | "value"> {
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
  options: OptionsType;
}

function TagsAutocomplete(props: Props) {
  const { options, onChange } = props;

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
      isClearable
      options={options}
      value={valueToValueType(value)}
      onChange={handleChange}
      isMulti
    />
  );
}

export default TagsAutocomplete;
