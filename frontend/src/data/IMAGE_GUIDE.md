# マークダウン画像追加ガイド

`markdown.tsx`で画像を表示できるようにする手順です。

## 手順

### 1. 画像ファイルを配置
画像ファイルを `frontend/src/data/text/images/` ディレクトリに配置します。

例：
```
frontend/src/data/text/images/my-image.png
```

### 2. 画像をインポートする
`frontend/src/components/markdown/markdown.tsx` の先頭（インポートセクション）に画像のインポートを追加します。

```typescript
import myImage from '@/data/text/images/my-image.png';
```

**例（現在の実装）:**
```7:8:frontend/src/components/markdown/markdown.tsx
import buri from '@/data/text/images/buri.png';
import chineseroom from '@/data/text/images/chinese_room.png';
```

### 3. `localImages` オブジェクトに追加
`localImages` オブジェクトに、ファイル名をキー、インポートした画像の `.src` を値として追加します。

```typescript
const localImages: Record<string, string> = {
  'buri.png': buri.src,
  'chinese_room.png': chineseroom.src,
  'my-image.png': myImage.src,  // ← 追加
};
```

**例（現在の実装）:**
```32:35:frontend/src/components/markdown/markdown.tsx
const localImages: Record<string, string> = {
  'buri.png': buri.src,
  'chinese_room.png': chineseroom.src,
};
```

### 4. マークダウンファイルで使用
マークダウンファイル内で画像を参照します。

#### 基本的な使用方法
```markdown
![代替テキスト](my-image.png)
```

#### サイズ指定付き（オプション）
幅と高さを指定できます。形式：`ファイル名 =幅x高さ`

```markdown
![代替テキスト](my-image.png =250x150)
```

**注意**: 
- 幅のみ指定: `my-image.png =250x` 
- 高さのみ指定: `my-image.png =x150`
- サイズ指定なし: `my-image.png`（元のサイズで表示）

## 実装の仕組み

1. **`resolveImagePath`関数** (62-72行目): 
   - `localImages`オブジェクトから画像パスを解決
   - HTTP URLや絶対パス（`/`で始まる）もサポート

2. **`parseImageSize`関数** (46-60行目):
   - サイズ指定パターン（`=幅x高さ`）を解析

3. **`img`コンポーネント** (173-206行目):
   - 画像をレンダリング
   - サイズ指定があれば適用
   - デフォルトスタイル: 角丸、ボーダー、遅延読み込み

## 注意事項

- 画像ファイル名は `localImages` のキーと完全に一致させる必要があります
- 外部URL（`http://` や `https://` で始まる）や絶対パス（`/` で始まる）はそのまま使用可能
- 画像は自動的に遅延読み込み（`loading="lazy"`）されます

