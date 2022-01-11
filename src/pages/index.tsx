import fs from "fs";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { VFC } from "react";
import YAML from "yaml";

import { type ImageYaml, imageYamlSchema } from "../schema/images";
import styles from "./index.module.scss";

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
    <div>
      {props._tag === "s" ? (
        <div className={styles.cards}>
          {props.parsed.map((p) => (
            <Link href={`images/${p.urlPath}`} key={p.imageName}>
              <div className={styles.link}>
                <Image
                  src={`/images/${p.imageName}`}
                  alt={`${p.name} の画像です`}
                  width={320}
                  height={180}
                  quality={100}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>{props.message}</p>
      )}
    </div>
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
