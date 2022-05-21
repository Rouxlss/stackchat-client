import { useRouter } from "next/router";

export const validateSession = () => {

    const router = useRouter();

    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            router.push('/dashboard')
        }
        router.push('/login')
    }

};
