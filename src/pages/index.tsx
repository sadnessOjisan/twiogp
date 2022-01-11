import fs from "fs";
import Link from "next/link";
import YAML from "yaml";
import Image from "next/image";
import path from "path";
import { GetServerSideProps } from "next";
import { VFC } from "react";
import { type ImageYaml, imageYamlSchema } from "../schema/images";

type Props =
  | {
      _tag: "s";
      parsed: ImageYaml;
    }
  | {
      _tag: "f";
      message: string;
    };

const Index: VFC<Props> = (props) => {
  return (
    <p>
      {props._tag === "s" ? (
        props.parsed.map((p) => (
          <Link href={`images/${p.urlPath}`} key={p.imageName}>
            <div>
              <Image src={`/images/${p.imageName}`} width={400} height={300} />
            </div>
          </Link>
        ))
      ) : (
        <p>{props.message}</p>
      )}
    </p>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const file = fs.readFileSync(
    path.join(process.cwd(), "public/config.yaml"),
    "utf8"
  );
  const parsed = YAML.parse(file);
  const validatedResult = imageYamlSchema.safeParse(parsed);
  if (validatedResult.success) {
    return {
      props: { _tag: "s", parsed },
    };
  } else {
    return { props: { _tag: "f", message: "データの取得に失敗しました。" } };
  }
};
