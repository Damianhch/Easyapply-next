(function () {
  function inject(slug, options) {
    var origin = (options && options.origin) || window.EASYAPPLY_ORIGIN || (window.location.origin || '');
    var container = (options && options.container) || document.currentScript && (document.currentScript.getAttribute('data-target') ? document.querySelector(document.currentScript.getAttribute('data-target')) : document.currentScript.parentElement) || document.body;
    var minHeightAttr = (options && options.minHeight) || (document.currentScript && document.currentScript.getAttribute('data-height')) || '400px';

    var iframe = document.createElement('iframe');
    iframe.src = origin.replace(/\/$/, '') + '/inline/' + encodeURIComponent(slug);
    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.style.minHeight = minHeightAttr;
    iframe.loading = 'lazy';
    iframe.setAttribute('allowtransparency', 'true');

    function onMessage(event) {
      try {
        var data = event.data || {};
        if (data && data.type === 'easyapply-embed:resize' && typeof data.height === 'number') {
          iframe.style.height = data.height + 'px';
        }
      } catch (e) {}
    }
    window.addEventListener('message', onMessage);

    container && container.appendChild(iframe);
    return iframe;
  }

  // Auto mode via data attributes
  function auto() {
    var s = document.currentScript;
    if (!s) return;
    var slug = s.getAttribute('data-slug');
    if (!slug) return;
    inject(slug, {});
  }

  window.EasyApplyEmbed = { inject: inject };
  auto();
})();


