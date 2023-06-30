import { TextField } from "@mui/material";
import { SearchIcon, SearchInput } from "./searchBar.styled";

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  options?: [{ id: number; label: string }];
};

export default function SearchBar({
  options = [{ id: 0, label: "Cari Anime" }],
  ...props
}: SearchBarProps) {
  const getOptionDisabled = (prop: any) => !prop.id;
  const getOptionLabel = (opt: any) => opt.label;

  return (
    <SearchInput
      size="medium"
      freeSolo
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionDisabled={getOptionDisabled}
      renderInput={(rest) => {
        const params = { ...props, ...rest };

        return (
          <TextField
            {...params}
            label="Search anime"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        );
      }}
    />
  );
}
