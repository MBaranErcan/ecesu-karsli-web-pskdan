import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Markdown içeriği güvenli biçimde (ham HTML devre dışı) render eder. */
export function Prose({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("prose-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a({ href, children, ...props }) {
            const target = href ?? "#";
            if (target.startsWith("/")) {
              return (
                <Link href={target} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={target} rel="noopener noreferrer" target="_blank" {...props}>
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            if (typeof src !== "string") return null;
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
