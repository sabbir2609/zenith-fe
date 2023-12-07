import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

export default function useLogin() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password })
      .unwrap()
      .then(() => {
        toast.success("You're Logged in !");
        router.push("/dashboard/");
      })
      .catch(() => {
        toast.error("Failed to Login to Your Account!");
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
