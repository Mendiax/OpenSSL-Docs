import * as vscode from 'vscode';
import axios from 'axios';

let outputChannel: vscode.OutputChannel;
let version: string = '3.0';

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel("OpenSSL Function Selector");
    outputChannel.show(true);
    outputChannel.appendLine("OpenSSL Function Selector activated");

    const provider = vscode.languages.registerHoverProvider('*', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position, /\b(EVP_|OSSL_)\w*\b/);
            const word = document.getText(range);

            if (range && word) {
                outputChannel.appendLine(`Hover detected on word: ${word}`);

                return fetchOpenSSLDocumentation(word).then(doc => {
                    if (doc.text !== 'No documentation found.' && doc.text !== 'Error fetching documentation.') {
                        vscode.window.showInformationMessage(`Documentation found for ${word}`);
                    }
                    return new vscode.Hover(new vscode.MarkdownString(doc.text));
                }).catch(error => {
                    logError(`Error fetching documentation for ${word}: ${error.message}`);
                    vscode.window.showErrorMessage(`Error fetching documentation for ${word}`);
                    return new vscode.Hover(new vscode.MarkdownString("Error fetching documentation."));
                });
            }
        }
    });

    context.subscriptions.push(provider);
}

async function fetchOpenSSLDocumentation(functionName: string): Promise<{ text: string, url: string }> {
    try {
        return await fetchDocumentation(functionName);
    } catch (error) {
        // Log the initial error
        logError(`Initial fetch failed for ${functionName}: ${error}`);

        // Try fallback with the last word removed
        const lastIndex = functionName.lastIndexOf('_');
        if (lastIndex > -1) {
            const fallbackFunctionName = functionName.substring(0, lastIndex);
            logError(`Trying fallback fetch for ${fallbackFunctionName}`);
            try {
                return await fetchDocumentation(fallbackFunctionName);
            } catch (fallbackError) {
                throw new Error(`Fallback fetch failed for ${fallbackFunctionName}: ${fallbackError}`);
            }
        } else {
            throw new Error(`No fallback possible for ${functionName}`);
        }
    }
}
async function fetchDocumentation(functionName: string): Promise<{ text: string, url: string }> {
    const url = `https://www.openssl.org/docs/man${version}/man3/${functionName}.html`;
    const response = await axios.get(url);
    return { text: `[OpenSSL Documentation for ${functionName}](${url})\n`, url };
}

function logDebug(message: string) {
    if (outputChannel) {
        outputChannel.appendLine(`[DEBUG] ${message}`);
        outputChannel.show(true); // Show the output channel when logging an error
    }
}
function logError(message: string) {
    if (outputChannel) {
        outputChannel.appendLine(`[ERROR] ${message}`);
        outputChannel.show(true); // Show the output channel when logging an error
    }
}

export function deactivate() {
    if (outputChannel) {
        outputChannel.appendLine("OpenSSL Function Selector deactivated");
        outputChannel.dispose();
    }
}
