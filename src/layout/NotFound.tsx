import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export const NotFound = () => {
  const texts = useAppSelector((root: RootState) => root.common.texts);

  return <div>{texts.notFound}</div>;
};
