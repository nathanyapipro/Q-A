import * as React from "react";
import TagsAutocomplete from "../Autocomplete/Tags";
import { compose } from "react-apollo";

import { withTagsQuery, WithTagsQuery } from "../../queries/withTagsQuery";

interface OwnProps {
  value?: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
}

type Props = OwnProps & WithTagsQuery;

function TagsBase(props: Props) {
  const { tags, onChange, value } = props;
  const options = tags.map(status => ({
    value: status.id,
    label: status.name
  }));

  return (
    <TagsAutocomplete
      value={value}
      label="Tags"
      placeholder="Filter by Tags"
      options={options}
      onChange={onChange}
      isMulti={true}
    />
  );
}

const Tags: React.ComponentType<OwnProps> = compose(withTagsQuery)(TagsBase);

export default Tags;
