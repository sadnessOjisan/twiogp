import fs from "fs";
import YAML from "yaml";
import Image from "next/image";
import Head from "next/head";
import path from "path";

const Iid = ({ detail }) => {
  return (
    <div>
      <Head>
        <title>${detail.imageName}</title>
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOSTING_HOST}/images/${detail.imageName}`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_HOSTING_HOST}/images/${detail.imageName}`}
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
      <Image src={`/images/${detail.imageName}`} width={400} height={300} />
      編集は<a href="https://github.com/sadnessOjisan/twiogp">こちら</a>から
    </div>
  );
};

export default Iid;

export async function getServerSideProps(context) {
  const iid = context.params["iid"];
  const file = fs.readFileSync(
    path.join(process.cwd(), "public/config.yaml"),
    "utf8"
  );
  const parsed = YAML.parse(file);
  const detail = parsed.find((p) => p.urlPath === iid);
  console.log(JSON.stringify(parsed));
  return {
    props: { detail }, // will be passed to the page component as props
  };
}
