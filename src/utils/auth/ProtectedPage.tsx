import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "./isAuthenticated";

export default function withAuth(WrappedComponent: React.ComponentType) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();

        if (!authenticated && pathname?.startsWith("/auth")) {
          return;
        }

        if (!authenticated) {
          router.push("/auth/login");
        }

        if (authenticated && pathname?.startsWith("/auth")) {
          router.push("/");
        }
      };

      checkAuth();
    }, [pathname, router]);

    return <WrappedComponent {...props} />;
  };
}
