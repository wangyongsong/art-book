/* eslint-disable class-methods-use-this */
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

class CompressionCore {
  distribution(blob: Blob) {
    console.log(`blob`, blob);
    blob
      .arrayBuffer()
      .then((v) => {
        this.imagemin(Buffer.from(v));
        // console.log(`v`, v);
        return null;
      })
      .catch((err) => {
        console.log(`err`, err);
      });
    // this.imagemin(blob);
  }

  tinify() {}

  async imagemin(buffer: Buffer) {
    return imagemin
      .buffer(buffer, {
        plugins: [
          imageminJpegtran({ progressive: true }),
          // imageminPngquant({}),
        ],
      })
      .then((v) => {
        return v.toString('base64');
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }
}

export default new CompressionCore();
