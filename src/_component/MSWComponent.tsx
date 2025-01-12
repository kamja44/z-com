"use client";
import { handlers } from "@/mocks/handler";
import { Suspense, use } from "react";
const mockingEnabledPromise =
  typeof window !== "undefined" // 브라우저일 때
    ? import("@/mocks/browser").then(async ({ default: worker }) => {
        if (process.env.NODE_ENV === "production") {
          return;
        }
        // msw 시작
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);
        (module as any).hot?.dispose(() => {
          worker.stop();
        });
        console.log(worker.listHandlers());
      })
    : Promise.resolve();
export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  // promise를 반환하기 전까지는 아무것도 반환한지 않음
  // suspense를 이용하여 아무것도 반환하지 않게 설정
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}
function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
