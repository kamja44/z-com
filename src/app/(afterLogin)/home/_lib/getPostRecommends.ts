export async function getPostRecommends() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-cache", // next-15 기본값 no-cache => 캐싱하지않음
      // 캐싱하고 싶으면 cache: 'force-cache'로 설정
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
