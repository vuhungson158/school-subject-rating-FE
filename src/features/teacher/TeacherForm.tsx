import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { RadioGroupField, TextNumberField } from "../../formFields";
import { TeacherRequest } from "../../model";

interface FormInterface {
  onSubmit: (formValues: TeacherRequest) => void;
}

const initValue: TeacherRequest = {
  name: "",
  gender: "MALE",
  nationality: "",
  dob: "",
};

const schema = object({
  name: string().min(4).required(),
  nationality: string().required(),
  dob: string()
    .trim()
    .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "yyyy-mm-dd")
    .required(),
}).required();

const TeacherForm = ({ onSubmit }: FormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.teacher.isLoading);

  const { control, handleSubmit } = useForm<TeacherRequest>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextNumberField name="name" control={control} label="Teacher Name" />
      <RadioGroupField
        name="gender"
        control={control}
        label="Gender"
        options={[
          { value: "MALE", label: "Male" },
          { value: "FELMALE", label: "Felmale" },
        ]}
      />
      <TextNumberField name="nationality" control={control} label="Nationality" />
      <TextNumberField name="dob" control={control} label="Date Of Birth" />

      <Button
        sx={{ marginTop: 4 }}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Add"}
      </Button>
    </form>
  );
};

export default TeacherForm;