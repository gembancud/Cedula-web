import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const VerifyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="applicant_name" />
      <TextField source="applicant_email" />
      <TextField source="applicant_link" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="documents" />
      <TextField source="status" />
      <TextField source="evaluation" />
      {/* <TextField source="evaluator" /> */}
    </Datagrid>
  </List>
);

export const VerifyEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="applicant_name" />
      <TextInput source="applicant_email" />
      <TextInput source="applicant_link" />
      <TextInput source="documents" />
      <TextInput source="status" />
      <DateInput source="evaluation" />
      <TextInput source="evaluator" />
    </SimpleForm>
  </Edit>
);
