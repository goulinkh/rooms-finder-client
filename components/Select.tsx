import React, { FC } from "react";
import S, { GroupTypeBase, Styles } from "react-select";
import { ThemeConfig } from "react-select/src/theme";

type Props = {
  placeholder: string;
  disabled: boolean;
  options: any;
  onChange: any;
  value: string;
};

type SelectStyles = Partial<
  Styles<
    {
      value: string;
      label: string;
    },
    false,
    GroupTypeBase<{
      value: string;
      label: string;
    }>
  >
>;

export const Select: FC<Props> = ({
  placeholder,
  disabled,
  options,
  onChange,
  value,
}) => {
  const width = 165;
  const height = 29;
  const theme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: "var(--accent)",
      primary75: "var(--accent)",
      primary50: "var(--accent-light)",
      primary25: "var(--accent-light)",
    },
  });
  const customStyles: SelectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused || state.isSelected ? "white" : "black",
      backgroundColor:
        state.isFocused || state.isSelected || state.isRtl
          ? "var(--accent-light)"
          : "white",
      padding: 5,
      paddingBottom: 10,
      minWidth: "fit-content",
      width: "100%",
      whiteSpace: "nowrap",
      height,
    }),
    control: (provided, state) => ({
      width,
      height,
      borderRadius: "0px !important",
      transition: "all 0.4s ease-out",
      border: "none !important",
      borderBottom: state.isFocused
        ? "1px var(--accent) solid !important"
        : "1px rgba(0,0,0,0.25) solid !important",
      boxShadow: state.isFocused
        ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
        : "none !important",
      display: "flex",
    }),
    container: (provided) => ({
      width,
      height,
      boxShadow:
        provided.isFocused || provided.isSelected
          ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
          : "none !important",
      borderRadius: 10,
      ...provided,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  return (
    <S
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      styles={customStyles}
      theme={theme}
      onChange={onChange}
      value={value ? { value: value, label: value } : null}
    />
  );
};
