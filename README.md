## Installation

Use the package manager [Yarn](https://yarnpkg.com/getting-started/install) to install.

```bash
npm i yarn --global
```

## Usage

```
yarn install

yarn dev
```

## Project structure

➡️ Atomic design structure

# Build Project: `yarn build`

Requires:

- node-version: [14.x]
- branch: base/newbase

## Custom ckeditor5 plugin

- EMS cần đầy đủ plugin trong ckeditor nên phải dùng công cụ builder của ckeditor để add những plugin cần thiết để sử dụng.
- Hiện tại EMS đang dùng package `ckeditor5-anhnk` có plugin mathtype version 8.1.1
- Trong tương lai, khi cần update thêm plugin mới thì làm theo hướng dẫn sau:
  - Truy cập trang: https://ckeditor.com/ckeditor-5/online-builder/
  - Chọn classic > chọn những plugin cần thêm > sau đó download zip
  - đẩy source code trong zip lên npm sau đó cài đặt trên EMS và thay thế package hiện tại
