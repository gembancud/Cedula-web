import { DateField, Show, SimpleShowLayout, TextField } from "react-admin";
import { useParams } from "react-router-dom";

export const VerifyShow = () => {
  const { id } = useParams();
  console.log("id", id);
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="applicant_name" />
        <TextField source="applicant_email" />
        <TextField source="applicant_links" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="documents" />
        <TextField source="status" />
        <DateField source="evaluation" />
        <TextField source="evaluators" />
      </SimpleShowLayout>
    </Show>
  );
};
