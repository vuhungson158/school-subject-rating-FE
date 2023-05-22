import { ImageListItem } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export const NotFound = () => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);

  return (
    <ImageListItem>
      <img
        src={darkTheme ? "/img/404_dark.png" : "/img/404_light.jpg"}
        alt="404"
        loading="lazy"
      />
    </ImageListItem>
  );
};
