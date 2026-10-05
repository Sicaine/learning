// Netzteil-Siebung (L38): Preset von rectifier-lab im Modus „psu“ (Ladekondensator, Welligkeit ΔU, Diodenstrompulse, Einschalten).
import mountRectifier from './rectifier-lab.js';
export default function mount(stage, ctx) {
  return mountRectifier(stage, { ...ctx, params: { Ueff: 12, ...(ctx.params || {}), mode: 'psu' } });
}
