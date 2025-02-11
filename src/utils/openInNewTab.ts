export default function openInNewTab(url) {
    var win = window.open(url, '_blank');
    if (win) win.focus();
}