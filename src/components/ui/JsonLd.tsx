/** JSON-LD script etiketi. İçerik sunucuda üretilir; kullanıcı girdisi içermez. */
export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
