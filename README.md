# 🦜twiogp

つい、OGP で語ってしまう

## 📖 How to use

画像ページを Twitter などに貼ると OGP として展開されます。
ツイートの補足などにお使いください。

オススメは [知らんけど](https://twiogp.ojisan.dev/images/shirankedo) と [個人の感想です](https://twiogp.ojisan.dev/images/kojinnokannsodesu) です。

![知らんけど](./public/images/shirankedo.png)

## 🙏 Please contribute us

画像の追加・編集は自由に行えます。

### 追加方法

1. public/images に画像を追加
2. 画像のメタデータを public/config.yaml に追加

することで画像を追加できます。

yaml の構造は、

```yaml
- name: 画像のキャプション名として表示
  urlPath: その画像をOGPとして使えるページのURLパス
  imageName: 追加した画像のファイル名。img タグで表示する時に使うものであり、内部的な値であるため、追加したファイル名と一致していれば何でも良い値
```

### レビューの方法

基本的にはどのような追加・編集でも approve します。そのため自分が追加した画像やメタデータが後発のレビューで修正される可能性はご留意ください。
