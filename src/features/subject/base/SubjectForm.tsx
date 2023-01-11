import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { RadioGroupField, SelectField, TextNumberField } from "../../../formFields";
import { SubjectRequest } from "../../../model";

interface FormInterface {
  onSubmit: (formValues: SubjectRequest) => void;
  subject?: SubjectRequest;
}

const schema = object({
  name: string().min(2).required(),
  formYear: number().min(1).max(4).required(),
  unit: number().min(1).max(6).required(),
  teacherId: number().required(),
}).required();

export const SubjectForm = ({ subject, onSubmit }: FormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.subject.isLoading);
  const teacherList = useAppSelector(
    (state: RootState) => state.teacher.teacherList,
  );

  const initValue: SubjectRequest = subject || {
    name: "",
    formYear: 0,
    specialize: "BASIC",
    unit: 0,
    teacherId: 0,
  };

  const { control, handleSubmit } = useForm<SubjectRequest>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextNumberField name="name" control={control} label="Subject Name" />
      <RadioGroupField
        name="specialize"
        control={control}
        label="Specialize"
        options={[
          { value: "MANAGEMENT", label: "経営" },
          { value: "NETWORK", label: "ネットワーク" },
          { value: "BASIC", label: "基礎" },
        ]}
      />
      <TextNumberField name="formYear" control={control} label="Year Able" />
      <TextNumberField name="unit" control={control} label="Unit" />
      <SelectField
        name="teacherId"
        control={control}
        label="Teacher"
        options={teacherList.map((teacher) => ({
          value: teacher.id as number,
          label: teacher.name,
        }))}
      />

      {/* <AutoComplete
        name="teacherId"
        control={control}
        label="Teacher"
        options={teacherList.map((teacher) => ({
          value: teacher.id as number,
          label: teacher.name,
        }))}
      /> */}

      <Button
        sx={{ marginTop: 4 }}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Submit"}
      </Button>
    </form>
  );
};
