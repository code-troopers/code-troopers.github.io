import CMS from "decap-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
// TODO fix import with resolve-url-loader
// eslint-disable-next-line import/no-unresolved
// import styles from "!to-string-loader!css-loader!resolve-url-loader!postcss-loader!sass-loader!../css/main.scss";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import FooterPreview from "./cms-preview-templates/footer";

// CMS.registerPreviewStyle(styles, { raw: true });
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("footer", FooterPreview);


CMS.registerEditorComponent({
    // Internal id of the component
    id: "lightbox-image",
    // Visible label
    label: "Lightbox Image",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        {
            name: "title",
            label: "Title",
            widget: "string"
        },
        {
            name: "group",
            label: "Group",
            widget: "string"
        },
        {
            name: "image",
            label: "Image",
            widget: "image"
        },
    ],
    // Regex pattern used to search for instances of this block in the markdown document.
    // Patterns are run in a multiline environment (against the entire markdown document),
    // and so generally should make use of the multiline flag (`m`). If you need to capture
    // newlines in your capturing groups, you can either use something like
    // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
    // which will cause `(.*)` to match newlines as well.
    //
    // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
    // `(.*?)` vs `(.*)`), especially if matching against newline characters.
    pattern: /^-![(.*)]\((.*?) (.*?)\)$/ms,
    // Given a RegExp Match object
    // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
    // return an object with one property for each field defined in `fields`.
    //
    // This is used to populate the custom widget in the markdown editor in the CMS.
    fromBlock: function (match) {
        return {
            title: match[1],
            image: match[2],
            group: match[3]
        };
    },
    // Given an object with one property for each field defined in `fields`,
    // return the string you wish to be inserted into your markdown.
    //
    // This is used to serialize the data from the custom widget to the
    // markdown document
    toBlock: function (data) {
        return `
<a style="display: inline" href="${data.image}" data-lightbox="${data.group}" title="${data.title}">
  <img class="medium" src="${data.image}" alt="${data.title}">
</a>
`;
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function (data) {
        return `
<a style="display: inline" href="${data.image}" data-lightbox="${data.group}" title="${data.title}">
  <img class="medium" src="${data.image}" alt="${data.title}">
</a>
`;
    }
});


CMS.init();
