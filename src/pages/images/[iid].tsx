import fs from "fs";
import YAML from "yaml";
import Image from "next/image";
import Head from "next/head";
import path from "path";
import { imageYamlSchema, type ImageData } from "../../schema/images";
import { VFC } from "react";
import { GetServerSideProps } from "next";

type Props =
  | {
      _tag: "s";
      detail: ImageData;
    }
  | {
      _tag: "f";
      message: string;
    };

const Iid: VFC<Props> = (props) => {
  return (
    <div>
      {props._tag === "s" ? (
        <div>
          <Head>
            <title>${props.detail.imageName}</title>
            <meta
              property="og:image"
              content={`${process.env.NEXT_PUBLIC_HOSTING_HOST}/images/${props.detail.imageName}`}
            />
            <meta
              property="og:url"
              content={`${process.env.NEXT_PUBLIC_HOSTING_HOST}/images/${props.detail.imageName}`}
            />
            <meta
              property="og:description"
              content={`twiogp は注釈として使えるOGP画像ホスティングサービスです。GitHub上で追加・編集が可能です。`}
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:description"
              content={`twiogp は注釈として使えるOGP画像ホスティングサービスです。GitHub上で追加・編集が可能です。`}
            />
            <meta
              name="twitter:image"
              content={`twiogp は注釈として使えるOGP画像ホスティングサービスです。GitHub上で追加・編集が可能です。`}
            />
          </Head>
          <Image
            src={`/images/${props.detail.imageName}`}
            width={400}
            height={300}
          />
          編集は<a href="https://github.com/sadnessOjisan/twiogp">こちら</a>から
        </div>
      ) : (
        <p>{props.message}</p>
      )}
    </div>
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
