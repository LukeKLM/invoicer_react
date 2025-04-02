'use client';

import { useEffect } from "react";
import { setAccessToken } from "@/lib/services/authService";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function OAuthLogin() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setAccessToken(token);
      router.replace("/invoices");
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
}