/**
 * Utility to reliably detect if WebGL rendering context can be created.
 * Prevents THREE.WebGLRenderer from throwing unhandled context creation errors
 * in headless, sandboxed, or GPU-disabled environments.
 */
let cachedWebGLSupport: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (cachedWebGLSupport !== null) {
    return cachedWebGLSupport;
  }

  if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
    cachedWebGLSupport = false;
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    // Try both standard and experimental context names
    const gl =
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false });

    // Validate that context was actually returned and not null/undefined
    const supported = Boolean(gl && gl instanceof WebGLRenderingContext);
    
    // Clean up if context was created
    if (gl && 'getExtension' in gl) {
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    }

    cachedWebGLSupport = supported;
    return supported;
  } catch {
    cachedWebGLSupport = false;
    return false;
  }
}
