import {
  Datagrid,
  DateField,
  List,
  // ReferenceInput,
  TextField,
  TextInput,
} from "react-admin";

const verifyFilters = [
  // eslint-disable-next-line react/jsx-key
  <TextInput label="Search" source="q" alwaysOn />,
  // <ReferenceInput source="userId" label="" reference="users" />,
];
export const VerifyList = () => (
  <List filters={verifyFilters}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="links" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="documents" />
      <TextField source="status" />
      <TextField source="evaluation" />
      {/* <TextField source="evaluator" /> */}
    </Datagrid>
  </List>
);
