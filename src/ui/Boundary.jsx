import { Component } from "react";

/**
 * WebGL is not a guarantee. Blocked contexts, software renderers and older
 * GPUs all fail in ways that would otherwise take the whole page down with
 * them, so every canvas on this site renders inside one of these.
 */
export default class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Never swallow this silently — a dead canvas used to look identical to
    // a working one, which cost a lot of time to notice.
    console.error("[boundary] canvas failed:", error);
    this.props.onFail?.(error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
