import { LoginPage, UserResign } from "../features/auth";
import {
  SubjectAdd,
  SubjectDelete,
  SubjectEdit,
  SubjectRating
} from "../features/subject";
import { TeacherAdd } from "../features/teacher";

const Backdrops = () => {
  return (
    <>
      <LoginPage />
      <UserResign />

      <SubjectAdd />
      <SubjectEdit />
      <SubjectDelete />
      <SubjectRating />

      <TeacherAdd />
    </>
  );
};

export default Backdrops;
