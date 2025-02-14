# Next.js TypeScript Calendar App

## デモ

[カレンダーアプリを見る](https://nextjs-ts-calendar-c1mcjzg9w-wakiys-projects.vercel.app/)

## 機能

- 📅 月表示・週表示の切り替え
- ⏰ イベントの作成・編集・削除
- 🕒 終日イベントと時間指定イベントの管理
- 📱 レスポンシブデザイン
- 🎨 モダンな UI（Yamada UI 使用）

## 技術スタック

- **フレームワーク**: Next.js 15.1.6
- **言語**: TypeScript
- **UI ライブラリ**:
  - Yamada UI
  - Tailwind CSS
- **日付操作**: date-fns
- **アイコン**: react-icons

## 主要な依存関係

```json
{
  "@yamada-ui/react": "^1.7.4",
  "date-fns": "^4.1.0",
  "next": "15.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.4.0"
}
```

## プロジェクト構造

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── Calendar.tsx
│   │   │   ├── CalendarHeader.tsx
│   │   │   ├── MonthView/
│   │   │   └── WeekView/
│   │   └── events/
│   │       ├── EventModal.tsx
│   │       ├── EventDetailModal.tsx
│   │       └── DatePickerCalendar.tsx
│   ├── contexts/
│   │   └── CalendarContext.tsx
│   └── types/
│       └── index.ts
├── public/
├── tailwind.config.ts
└── package.json
```

## 主要な機能の説明

### カレンダービュー

- **月表示**: 月単位でイベントを確認できます
- **週表示**: 週単位で詳細なスケジュールを確認できます
- **現在時刻表示**: 週表示で現在時刻を赤線で表示

### イベント管理

- イベントの作成、編集、削除が可能
- 終日イベントと時間指定イベントの切り替え
- 直感的なモーダル UI でイベント情報を編集

### UI/UX

- Yamada UI を使用したモダンなデザイン
- Tailwind CSS によるレスポンシブ対応
- 日本語対応（日付フォーマット、曜日表示）

## ローカルでの実行方法

```bash
# リポジトリのクローン
git clone <repository-url>

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番モードでの起動
npm run start
```

## デプロイ

このプロジェクトは[Vercel](https://vercel.com)にデプロイされています。
メインブランチへのプッシュ時に自動的にデプロイが実行されます。

## ライセンス

MIT

---

作成者: [@wakiy1031](https://github.com/wakiy1031)
