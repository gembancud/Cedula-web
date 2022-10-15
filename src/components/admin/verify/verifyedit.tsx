import { DateInput, Edit, SimpleForm, TextInput } from "react-admin";

export const VerifyEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="applicant_name" />
      <TextInput source="applicant_email" />
      <TextInput source="applicant_links" />
      <TextInput source="documents" />
      <TextInput source="status" />
      <DateInput source="evaluation" />
      <TextInput source="evaluators" />
    </SimpleForm>
  </Edit>
);
