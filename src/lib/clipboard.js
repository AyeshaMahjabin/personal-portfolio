/**
 * Copy text to the clipboard, with a fallback for the cases the async
 * Clipboard API refuses: non-secure contexts (plain http, some previews),
 * older browsers, and permission policies that block it outright.
 *
 * The fallback drops a hidden textarea on the page, selects it and asks the
 * document to copy — deprecated, but it still works everywhere the modern API
 * does not. Returns true only if the text actually made it across.
 */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the manual path */
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
