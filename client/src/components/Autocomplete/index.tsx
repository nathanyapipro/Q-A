import * as React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { default as ReactSelect } from "react-select";
import TextField from "@material-ui/core/TextField";
import { Props as ReactSelectProps } from "react-select/lib/Select";
import {
  ValueType as ReactValueType,
  OptionsType as ReactOptionsType,
  InputActionMeta
} from "react-select/lib/types";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import { PlaceholderProps } from "react-select/lib/components/Placeholder";
import { ControlProps } from "react-select/lib/components/Control";
import { NoticeProps, MenuProps } from "react-select/lib/components/Menu";
import { MultiValueGenericProps } from "react-select/lib/components/MultiValue";
import { ValueContainerProps } from "react-select/lib/components/containers";
import { OptionProps } from "react-select/lib/components/Option";
import { debounce } from "../../helpers/functional";
import { Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: "1 1 auto"
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  input: {
    display: "flex",
    flex: "1 1 auto",
    paddingRight: theme.spacing.unit / 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: "1 1 auto",
    alignItems: "center"
  },
  multiValueContainer: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing.unit / 2,
    "&>:nth-child(2)": {
      display: "none"
    },
    fontWeight: theme.typography.fontWeightMedium,
    "&>:first-child": {
      color: "inherit !important"
    }
  },
  multiValueContainerLabel: {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 4}px ${theme
      .spacing.unit / 4}px ${theme.spacing.unit}px`
  },
  valueColor: {
    flexShrink: 0,
    height: theme.spacing.unit,
    width: theme.spacing.unit,
    borderRadius: "100%",
    marginRight: theme.spacing.unit
  },
  valueDescription: {
    marginLeft: theme.spacing.unit,
    color: `${theme.palette.text.secondary} !important`
  },
  valueLabel: {
    color: `${theme.palette.text.primary} !important`
  },
  singleValue: {
    fontSize: "1rem",
    paddingLeft: theme.spacing.unit / 2
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  placeholder: {
    position: "absolute",
    left: theme.spacing.unit * 2
  },
  paper: {
    position: "absolute",
    zIndex: theme.zIndex.modal,
    overflowY: "auto",
    color: `${theme.palette.text.primary} !important`,
    left: 0,
    right: 0
  }
}));

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }: any) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      InputLabelProps={{
        shrink: true
      }}
      className={props.selectProps.classes.field}
      error={props.selectProps.error}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props: OptionProps<OptionType>) {
  const { data } = props;
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {data.color && (
        <div
          className={props.selectProps.classes.valueColor}
          style={{ backgroundColor: data.color }}
        />
      )}
      <Typography
        variant="body2"
        color="textPrimary"
        className={props.selectProps.classes.valueLabel}
      >
        {data.label}
      </Typography>
      {data.description && (
        <Typography
          className={props.selectProps.classes.valueDescription}
          variant="caption"
          color="textSecondary"
          noWrap
        >
          — &nbsp; {data.description}
        </Typography>
      )}
    </MenuItem>
  );
}

function Placeholder(props: PlaceholderProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      variant="body2"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      variant="body2"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

const MultiValueContainer = (props: MultiValueGenericProps<OptionType>) => {
  const { data } = props as any;
  let style = {} as any;
  if (data.color) {
    style = {
      backgroundColor: data.color,
      color: "white"
    };
  }

  return (
    <Tooltip
      title={
        <Typography variant="caption" color="inherit">
          {data.description}
        </Typography>
      }
      placement="bottom"
    >
      <Paper
        elevation={1}
        className={classNames(props.selectProps.classes.multiValueContainer)}
        style={style}
      >
        <Typography
          variant="body2"
          color="inherit"
          className={props.selectProps.classes.multiValueContainerLabel}
        >
          {data.label}
        </Typography>
        {props.children}
      </Paper>
    </Tooltip>
  );
};

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper
      id="autocomplete-menu"
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

export type OptionType = { label: string; value: any };
export type OptionsType = ReactOptionsType<OptionType>;
export type ValueType = ReactValueType<OptionType>;

export interface AutocompleteProps extends ReactSelectProps {
  label?: string;
  error?: boolean;
  minInputLength?: number;
  disableDebounce?: boolean;
  debounceTimeout?: number;
  defaultOptions?: OptionsType;
}

type Props = AutocompleteProps;

const AutocompleteBase = React.memo(function AutocompleteBase(props: Props) {
  const classes = useStyles();
  const {
    id,
    label,
    onInputChange,
    disableDebounce,
    debounceTimeout = 250,
    minInputLength = 3,
    ...rest
  } = props;

  const components = {
    Control,
    Menu,
    MultiValueContainer,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
  };

  const styles = {
    input: (base: React.CSSProperties) => ({
      ...base,
      display: "flex",
      flex: "1 1 auto",
      "& input": {
        font: "inherit"
      }
    })
  };

  let maybeDebounceOnInputChange: AutocompleteProps["onInputChange"];
  if (onInputChange) {
    maybeDebounceOnInputChange = disableDebounce
      ? onInputChange
      : debounce(onInputChange, debounceTimeout);
  }

  const handleInputChange = (input: string, actionMeta: InputActionMeta) => {
    if (maybeDebounceOnInputChange && input.length >= minInputLength) {
      maybeDebounceOnInputChange(input, actionMeta);
    }
  };

  return (
    <div className={classes.root}>
      {
        // @ts-ignore
        <ReactSelect
          id={id}
          styles={styles}
          // @ts-ignore
          classes={classes}
          onInputChange={handleInputChange}
          textFieldProps={{
            label
          }}
          components={components}
          {...rest}
        />
      }
    </div>
  );
});

// @ts-ignore
const Autocomplete = AutocompleteBase;

export default Autocomplete;
