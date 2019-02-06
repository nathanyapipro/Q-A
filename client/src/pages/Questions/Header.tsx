import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import StatusesAutocomplete from "../../components/Autocomplete/Statuses";
import TagsAutocomplete from "../../components/Autocomplete/Tags";
import { statuses, tags } from "../../queries";
import { Query } from "react-apollo";
import { Statuses as StatusesQueryData } from "../../types/queries/Statuses";
import { Tags as TagsQueryData } from "../../types/queries/Tags";

class StatusesQuery extends Query<StatusesQueryData> {}
class TagsQuery extends Query<TagsQueryData> {}

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    marginBottom: theme.spacing.unit,
    "&>:not(:last-child)": {
      marginRight: theme.spacing.unit
    }
  },
  field: {
    flexBasis: "50%"
  }
}));

function HeaderBase(_: Props) {
  const classes = useStyles({});

  const [selectedStatusOptions, setSelectedStatusOptions] = React.useState<
    Array<any>
  >([]);
  const [selectedTagsOptions, setSelectedTagsOptions] = React.useState<
    Array<any>
  >([]);

  function handleStatusChange(item: any) {
    setSelectedStatusOptions(item);
  }

  function handleTagsChange(item: any) {
    setSelectedTagsOptions(item);
  }

  return (
    <div className={classes.container}>
      <div className={classes.field}>
        <StatusesQuery query={statuses}>
          {({ data }) => {
            const options =
              data && data.statuses && data.statuses.nodes
                ? data.statuses.nodes.map(status => ({
                    value: status.id,
                    label: status.name
                  }))
                : [];

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
          }}
        </StatusesQuery>
      </div>
      <div className={classes.field}>
        <TagsQuery query={tags}>
          {({ data }) => {
            const options =
              data && data.tags && data.tags.nodes
                ? data.tags.nodes.map(tag => ({
                    value: tag.id,
                    label: tag.name
                  }))
                : [];

            return (
              <TagsAutocomplete
                value={selectedTagsOptions}
                label="Tags"
                options={options}
                placeholder="Filter by Tags"
                onChange={handleTagsChange}
                isMulti={true}
              />
            );
          }}
        </TagsQuery>
      </div>
    </div>
  );
}

const Header = HeaderBase;

export default Header;
