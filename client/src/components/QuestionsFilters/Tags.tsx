import * as React from "react";
import TagsAutocomplete from "../Autocomplete/Tags";
import { compose } from "react-apollo";

import { withTagsQuery, WithTagsQuery } from "../../hocs/withTagsQuery";

interface OwnProps {}

type Props = OwnProps & WithTagsQuery;

function TagsBase(props: Props) {
  const [selectedTagsOptions, setSelectedTagsOptions] = React.useState<
    Array<any>
  >([]);

  function handleTagsChange(item: any) {
    setSelectedTagsOptions(item);
  }

  const { tags } = props;
  const options = tags.map(status => ({
    value: status.id,
    label: status.name
  }));

  return (
    <TagsAutocomplete
      value={selectedTagsOptions}
      label="Tags"
      placeholder="Filter by Tags"
      options={options}
      onChange={handleTagsChange}
      isMulti={true}
    />
  );
}

const Tags: React.ComponentType<OwnProps> = compose(withTagsQuery)(TagsBase);

export default Tags;
