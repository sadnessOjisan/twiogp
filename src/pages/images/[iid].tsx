import fs from "fs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import path from "path";
import { VFC } from "react";
import YAML from "yaml";

import { type ImageData, imageYamlSchema } from "../../schema/images";
import styles from "./iid.module.scss";

type Success = {
  _tag: "s";
  detail: ImageData;
};

type Fail = {
  _tag: "f";
  message: string;
};
type Props = Success | Fail;

const Iid: VFC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      {props._tag === "s" ? (
        <div>
          <Meta data={props} />
          <div className={styles.imageWrapper}>
            <Image
              src={`/images/${props.detail.imageName}`}
              alt={`${props.detail.imageName} の画像です`}
              width={900}
              height={600}
            />
          </div>
          <p className={styles.footnote}>
            編集は<a href="https://github.com/sadnessOjisan/twiogp">こちら</a>
            から
          </p>
        </div>
      ) : (
        <p>{props.message}</p>
      )}
    </div>
  );
};

const Meta: VFC<{ data: Success }> = ({ data }) => {
  const origin = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_HOSTING_HOST;
  return (
    <Head>
      <title>{data.detail.name} | twiogp</title>
      <meta
        property="og:image"
        content={`${origin}/images/${data.detail.imageName}`}
      />
      <meta property="og:title" content={`${data.detail.name} | twiogp`} />
      <meta
        property="og:url"
        content={`${origin}/images/${data.detail.urlPath}`}
      />
      <meta
        property="og:description"
        content={`twiogp は注釈として使えるOGP画像ホスティングサービスです。GitHub上で自由に追加・編集が可能です。`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:description"
        content={`twiogp は注釈として使えるOGP画像ホスティングサービスです。GitHub上で自由に追加・編集が可能です。`}
      />
      <meta
        name="twitter:image"
        content={`${origin}/images/${data.detail.imageName}`}
      />
      <meta　name="twitter:image:alt"　content={data.detail.name}　/>
    </Head>
  );
};

export default Iid;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const params = context.params;
  if (params === undefined) {
    return {
      props: {
        _tag: "f",
        message: "クエリが存在しません。不正なURLです。",
      },
    };
  }
  const iid = params["iid"];
  if (typeof iid !== "string") {
    return {
      props: {
        _tag: "f",
        message: "クエリパスが不正な形です。",
      },
    };
  }
  const file = fs.readFileSync(
    path.join(process.cwd(), "public/config.yaml"),
    "utf8"
  );
  const parsed = YAML.parse(file);
  const validateResult = imageYamlSchema.safeParse(parsed);
  if (validateResult.success) {
    const detail = validateResult.data.find((p) => p.urlPath === iid);
    if (detail === undefined) {
      return { props: { _tag: "f", message: "データが見つかりません。" } };
    }
    return {
      props: { _tag: "s", detail },
    };
  } else {
    return {
      props: {
        _tag: "f",
        message: "不正なデータを検知しました。",
      },
    };
  }
};
