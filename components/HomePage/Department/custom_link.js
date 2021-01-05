import Link from "next/link"

export default function CustomLink({ slug, children }) {
  if (slug === "/new-bikes") {
    return <a href={slug}>{children}</a>
  } else {
    return (
      <Link href={slug}>
        <a>{children}</a>
      </Link>
    )
  }
}
