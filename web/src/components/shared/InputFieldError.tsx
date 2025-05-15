export default function InputFieldError({ error }: { error: string }) {
  return <p className="mt-1 text-sm text-red-500">{error}</p>;
}
