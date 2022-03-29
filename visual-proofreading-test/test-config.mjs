// デザイン画像が格納しているディレクトリ
export const DESIGN_DIR = "./design";

// スクリーンショットを格納するディレクトリ
export const SCREENSHOT_DIR = "./screenshot";

// 差分ファイルを出力する格納するディレクトリ
export const DIFF_DIR = "./diff";

// 実装したもののURL
export const CAPTURE_URL = "http://localhost:8080";

// ブラウザのビューポートサイズ
export const VIEW_PORT = { width: 1280, height: 720 };

// テスト設定。デザイン画像とスクリーンショットを撮るパスを記述する
export const testSettings = [
  {
    design: "top.png",
    capturePath: "/",
  },
  {
    design: "about.png",
    capturePath: "/about/",
  },
  {
    design: "works.png",
    capturePath: "/works/",
  },
];