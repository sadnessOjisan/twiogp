import fs from "fs";
import Link from "next/link";
import YAML from "yaml";
import Image from "next/image";
import path from "path";
const Index = ({ parsed }) => {
  return (
    <p>
      r
      {parsed.map((p) => (
        <Link href={`images/${p.urlPath}`} key={p.imageName}>
          <div>
            <Image src={`/images/${p.imageName}`} width={400} height={300} />
          </div>
        </Link>
      ))}
    </p>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "public/config.yaml"),
    "utf8"
  );
  const parsed = YAML.parse(file);
  return {
    props: { parsed }, // will be passed to the page component as props
  };
}
