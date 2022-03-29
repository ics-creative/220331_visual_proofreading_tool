import puppeteer from "puppeteer";
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import {
  CAPTURE_URL,
  DESIGN_DIR,
  DIFF_DIR,
  SCREENSHOT_DIR,
  testSettings,
  VIEW_PORT,
} from "./test-config.mjs";

(async () => {
  // 出力先フォルダがなければ作成
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR);
  }
  if (!existsSync(DIFF_DIR)) {
    mkdirSync(DIFF_DIR);
  }

  // Puppeteer起動
  const browser = await puppeteer.launch();

  // 設定ごとに実行
  for (const { design, capturePath } of testSettings) {
    // デザイン画像へのパス
    const designFilePath = `${DESIGN_DIR}/${design}`;

    // デザイン画像のファイル名取得
    const designFileName = path.parse(designFilePath).name;

    // スクリーンショットの格納先とファイル名
    const screenshotFilePath = `${SCREENSHOT_DIR}/screenshot_${designFileName}.png`;

    // Puppeteerの設定
    const page = await browser.newPage();
    await page.setViewport(VIEW_PORT);
    await page.goto(`${CAPTURE_URL}${capturePath}`);
    // アニメーションが終わるまで待機

    // スクロールで実行されるなにかがある場合
    await page.evaluate(() => {
      scroll(0,99999)
      setTimeout(()=>{
        scroll(0,0)
      },200)
    });
    await page.waitForTimeout(5000);

    // ページ全体のスクリーンショット撮影
    await page.screenshot({
      path: screenshotFilePath,
      fullPage: true,
    });

    const designImage = sharp(designFilePath);
    const designImageMetaData = await designImage.metadata();

    const screenshotImage = sharp(screenshotFilePath);

    // デザイン画像のサイズ取得
    const designImageSize = {
      width: designImageMetaData.width,
      height: designImageMetaData.height,
    };

    // スクリーンショット画像をデザイン画像のサイズにリサイズ
    const resizedScreenshot = await screenshotImage
      .resize({
        width: designImageSize.width,
        height: designImageSize.height,
        fit: null,
        position: "left top",
        withoutEnlargement: true,
      })
      .toBuffer();

    // デザイン画像とスクリーンショット画像を重ねて差の絶対値で差分を検出
    const difference = await designImage
      .composite([
        {
          input: resizedScreenshot,
          blend: "difference",
          gravity: "northwest",
        },
      ])
      .toBuffer();

    // 分かりやすいよう白黒反転し、ファイル出力
    await sharp(difference)
      .negate({ alpha: false })
      .toFile(`${DIFF_DIR}/diff_${design}.png`);
  }

  await browser.close();
})();
