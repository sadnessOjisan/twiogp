# 🦜twiogp

つい、OGP で語ってしまう

## 📖 How to use

画像ページを Twitter などに貼ると OGP として展開されます。
ツイートの補足などにお使いください。

オススメは [知らんけど](https://twiogp.ojisan.dev/images/shirankedo) です。

![知らんけど](./public/images/shirankedo.png)

## 🙏 Please contribute us

画像の追加・編集は自由に行えます。

### 追加方法

1. [public/images](https://github.com/sadnessOjisan/twiogp/tree/main/public/images) に画像を追加
2. 画像のメタデータを [public/config.yaml](https://github.com/sadnessOjisan/twiogp/blob/main/public/config.yaml) に追加

することで画像を追加できます。

yaml の構造は、

```yaml
- name: 画像のキャプション名として表示。alt にも `${name}です` として設定されます。
  urlPath: その画像をOGPとして使えるページのURLパス
  imageName: 追加した画像のファイル名。img タグで表示する時に使うものであり、内部的な値であるため、追加したファイル名と一致していれば何でも良い値
```

です。

### レビューの仕組み

基本的にはどのような追加・編集でも approve します。そのため自分が追加した画像やメタデータが後発のレビューで修正される可能性はご留意ください。

## ❌ 禁止事項

- 誰かを誹謗中傷するような画像
- アダルト

禁止事項に該当するものに対する PR は reject します。
