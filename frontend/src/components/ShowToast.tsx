import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR",
  onClose: () => void;
};

function ShowToast({ message, type,onClose }: ToastProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, 3000);
        return () => clearTimeout(timer);
      }
    , [onClose]
    )

  const styles =
    type === "SUCCESS"
      ? "bg-green-600 fixed top-4 right-4 z-50 px-5 py-3 rounded-md text-white max-w-md"
      : "bg-red-600 fixed top-4 right-4 z-50 px-5 py-3  rounded-md text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className=" text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}

export default ShowToast;
