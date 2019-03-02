import * as React from "react";
import Autocomplete, { AutocompleteProps, ValueType } from ".";
import { Omit } from "../../types";
import * as autocompleteHelper from "../../helpers/autocomplete";
import { QuestionsOrderBy } from "../../types/apollo";

interface OwnProps
  extends Omit<AutocompleteProps, "onInputChange" | "onChange" | "value"> {
  value?: QuestionsOrderBy | Array<QuestionsOrderBy>;
  onChange: (value: QuestionsOrderBy | Array<QuestionsOrderBy>) => void;
}

type Props = OwnProps;

const options = [
  {
    label: "Created At",
    value: QuestionsOrderBy.CREATED_AT_DESC
  },
  {
    label: "Votes",
    value: QuestionsOrderBy.VOTE_COUNT_DESC
  }
];

function OrderByAutocompleteBase(props: Props) {
  const { onChange } = props;

  const valueToValueType = (
    value?: QuestionsOrderBy | Array<QuestionsOrderBy>
  ): ValueType => {
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

const OrderByAutocomplete = OrderByAutocompleteBase;

export default OrderByAutocomplete;
