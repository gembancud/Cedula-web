import { DateInput, Edit, SimpleForm, TextInput } from "react-admin";

export const VerifyEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="links" />
      <TextInput source="documents" />
      <TextInput source="status" />
      <DateInput source="evaluation" />
      <TextInput source="evaluators" />
    </SimpleForm>
  </Edit>
);
