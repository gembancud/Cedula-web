export default function Receipt({ signup }: any) {
  return (
    <div>
      <h1>Thank you for signing up!</h1>
      <p>Here is your receipt:</p>
      <p>{JSON.stringify(signup)}</p>
    </div>
  );
}
