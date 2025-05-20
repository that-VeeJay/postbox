import { useEffect } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export default function useToast(keyName: string) {
  const location = useLocation();

  useEffect(() => {
    if (location.state && keyName in location.state) {
      toast(location.state[keyName], {
        position: "bottom-right",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state, keyName]);
}
