/**
 * PB2I — Shared Machine Details Modal markup
 */
export function createMachineModal() {
  return `
  <!-- Machine/Technologie Modal Overlay -->
  <div id="machine-overlay"
    class="fixed inset-0 z-[1000] flex p-4 opacity-0 pointer-events-none transition-opacity duration-250"
    style="background:rgba(0,0,0,0.6);backdrop-filter:blur(4px)">

    <div class="m-auto bg-white rounded-2xl max-w-3xl w-full max-h-[85dvh] sm:max-h-[90dvh] overflow-hidden flex flex-col animate-scale-in"
      style="box-shadow:var(--shadow-modal)">

      <!-- Modal Header -->
      <div class="bg-primary flex items-center justify-between px-6 py-4 flex-shrink-0">
        <h2 id="modal-title" class="font-heading font-bold text-lg text-white">Détails</h2>
        <button id="modal-close"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xl leading-none"
          aria-label="Fermer">✕</button>
      </div>

      <!-- Modal Body -->
      <div class="overflow-y-auto flex-1 p-6">
        <img id="modal-img" src="" alt="" class="bg-warm-bg w-full h-auto max-h-48 sm:max-h-72 lg:max-h-80 object-contain rounded-xl mb-6">
        <h3 id="modal-name" class="text-body font-heading font-bold text-xl mb-4"></h3>
        <div id="modal-desc" class="text-muted text-sm leading-relaxed"></div>
      </div>
    </div>
  </div>
  `;
}
