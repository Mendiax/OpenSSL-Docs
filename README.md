# OpenSSL Documentation Extension for Visual Studio Code


## Overview

This extension enhances Visual Studio Code with the ability to display link to documentation for OpenSSL functions directly from the official OpenSSL website.

## Features

- **Hover Documentation**: Hover over `EVP_` and `OSSL_` prefixed functions in your code to see documentation fetched from OpenSSL's documentation pages.
- **Fallback Mechanism**: If direct function match fails, the extension attempts to find documentation by removing the last word separated by `_`.

## Requirements

- Visual Studio Code version 1.60.0 or above.

## Installation

1. Download the `.vsix` file of the extension from the [Releases](https://github.com/Mendiax/openssl-docs/releases) page.
2. Install the extension by following the [instructions](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix) on Visual Studio Code's documentation.

## Usage

- Hover over `EVP_` or `OSSL_` prefixed functions in your code to trigger the documentation popup.
- Click on the link provided in the popup to open the full documentation page in your web browser.

## Extension Settings

- There are currently no customizable settings for this extension.

## Known Issues

- None at the moment. Please report any issues [here](https://github.com/Mendiax/openssl-docs/issues).

## Release Notes

### Version 1.0.0

- Initial release of the OpenSSL Documentation Extension.
- Added support for links to documentation from OpenSSL's website.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request or open an issue [here](https://github.com/Mendiax/openssl-docs/issues).

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
