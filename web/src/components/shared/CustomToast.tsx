type PropsType = {
  message: string;
  type: "success" | "error";
};

export default function CustomToast({ message, type = "success" }: PropsType) {
  const style =
    type === "success"
      ? " border-green-600 bg-green-500/75 dark:border-green-900 dark:bg-green-600/20"
      : "border-red-600 bg-red-500/75 dark:border-red-900 dark:bg-red-600/20";

  return (
    <div className={`rounded-lg border-2 p-3 text-white ${style}`}>
      {message}
    </div>
  );
}
