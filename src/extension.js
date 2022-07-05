'use strict'
const vscode = require('vscode')
   
function postProcessLabel(label, defaultProcess) {
    console.log(`postprocesslabel : ${label}`)

    // do default processing
	label = defaultProcess(label);

    // add extension
    if (vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('showextension')) {
        label += vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('urisuffix');
    }

    // add brackets
    switch (vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('previewlabelstyling')) {
        case "[[label]]":
            return `[[${label}]]`;
        case "[label]":
            return `[${label}]`;
        case "label":
            return label;
    }
}


function activate(context) {
    return {
        extendMarkdownIt(md) {
            return md.use(
                require('@shdwcat/markdown-it-wikilinks')({
                    vscodeSupport: true,
                    postProcessLabel: postProcessLabel,
                    uriSuffix: `${vscode.workspace.getConfiguration("markdown-wiki-links-preview").get('urisuffix')}`,
                    description_then_file: vscode.workspace.getConfiguration("markdown-wiki-links-preview").get("descriptionthenfile"),
                    separator: vscode.workspace.getConfiguration("markdown-wiki-links-preview").get("WikiLinksSeparator"),
                }));
        }
    };
}
exports.activate = activate;
exports.postProcessLabel = postProcessLabel;

